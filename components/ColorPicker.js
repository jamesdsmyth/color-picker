import React, { Component } from 'react';
import { View, Animated, Text, Dimensions, PanResponder } from 'react-native';
import styles from '../styles/styles';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: {
        one: new Animated.ValueXY(),
        two: new Animated.ValueXY(),
        three: new Animated.ValueXY()
      },
      bgColor: [255, 255, 255],
      height: Dimensions.get('window').height - 180,
      boundaryTop: 50,
      responders: new Array(3), // we populate this array using PanResponder.create() function
      hideRgbValues: false,
      initialised: false
    }
  }

  // here we can set up the panhandlers before render
  componentWillMount() {
    this.attachPanHandlerEvents();
  }

  // here we can set all our variables
  componentDidMount() {
    this.setHeight();
    this.setBgColor();
  }

  // setting the height of the drag area if the prop is passed
  setHeight() {
    if(this.props.height && Number.isInteger(this.props.height)) {
      this.setState({
        height: this.props.height
      });
    }
  }

  setBgColor() {
    const color = this.props.color;
    if(color === 3 && Array.isArray(color)) {
      this.setColorState(color);
    } else {
      this.setRandomColor();
    }
  }

  // if color was not passed as a prop, then we create a random color
  setRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    
    this.setColorState([r, g, b]);
  }

  // expects an array [r, g, b];
  setColorState(bgColor) {
    const percentage = this.state.height / 255;
    const width = Dimensions.get('window').width;
    const posY0 = (percentage * bgColor[0]) + this.state.boundaryTop;
    const posY1 = (percentage * bgColor[1]) + this.state.boundaryTop;
    const posY2 = (percentage * bgColor[2]) + this.state.boundaryTop;

    // cannot be set using setState()
    this.state.pan.one.setOffset({ x: 0, y: posY0 });
    this.state.pan.one.flattenOffset();
    this.state.pan.two.setOffset({ x: 0, y: posY1 });
    this.state.pan.two.flattenOffset();
    this.state.pan.three.setOffset({ x: 0, y: posY2 });
    this.state.pan.three.flattenOffset();

    this.setState({
      bgColor,
      circle0Left: (width / 4) - 25,
      circle1Left: (width / 2) - 25,
      circle2Left: ((width / 4) * 3) - 25,
      circle0PosY: posY0,
      circle1PosY: posY1,
      circle2PosY: posY2,
      initialised: true
    })
  }

  // we loop through 3 circles to create 3 seperate pan responders
  attachPanHandlerEvents() {
    for(let i = 0; i < this.state.responders.length; i++) {

      const selector = this.state.pan[Object.keys(this.state.pan)[i]];

      this.state.responders[i] = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (e, gestureState) => {
          selector.setOffset({x: selector.x._value, y: selector.y._value});
        },

        onPanResponderMove: (e, gestureState) => {
          // here we are setting the position of the gesture move. 
          // This will then re-render the view with the correct
          // background color
          this.setState({
            [`circle${i}PosY`]: gestureState.moveY
          });
  
          Animated.event([null, {
            dy: selector.y
          }])(e, gestureState);
  
          // now we can call the background color and change it.
          this.updateBackgroundColor();
        },

        // on release, if the current cirlce is outside the boundaries we will
        // move it back to the edge of the boundary and then reset the color
        onPanResponderRelease: (e, gestureState) => {
          const boundaryBottom = this.state.height;
          const boundaryTop = this.state.boundaryTop;

          if(gestureState.moveY > boundaryBottom) {
            Animated.spring(selector, {
              toValue: { y: boundaryBottom, x: 0 },
              friction: 6
            }).start();

            setTimeout(() => {
              this.setState({
                [`circle${i}PosY`]: boundaryBottom 
              });

              selector.flattenOffset();
              this.updateBackgroundColor();
            }, 0)
          } else if(gestureState.moveY < boundaryTop) {
            Animated.spring(selector, {
              toValue: { y: boundaryTop, x: 0 },
              friction: 10
            }).start();

            setTimeout(() => {
              this.setState({
                [`circle${i}PosY`]: 0
              });

              selector.flattenOffset();
              this.updateBackgroundColor();
            }, 0) 
          } else {
            selector.flattenOffset();
          }
        }
      });
    }
  }

  // getting the correct RGB values using the position of each of the circles
  updateBackgroundColor() {
    const colors = 255;
    const h = this.state.height;
    let r = Math.round((colors / h) * this.state.circle0PosY);
    let g = Math.round((colors / h) * this.state.circle1PosY);
    let b = Math.round((colors / h) * this.state.circle2PosY);

    // if we drag the circle further than the boundary it will give a value greater than 255
    // we want to correct this
    r  = r > 255 ? 255 : r;
    g  = g > 255 ? 255 : g;
    b  = b > 255 ? 255 : b;

    this.setState({
      bgColor: [r, g, b]
    });

    // if the 'returnColor' function is passed, then we return the color
    this.props.returnColor && this.props.returnColor([r, g, b]);
  }

  render() {
    let circle = {};

    // here we are looping through each pan and getting the translate and translateY for each one
    for(let i = 0; i < this.state.responders.length; i++) {
      const currentPan = this.state.pan[Object.keys(this.state.pan)[i]];  
      const translateX = this.state[`circle${i}Left`];
      const translateY = currentPan.y;

      circle[`circleStyle${i}`] = {
        transform: [{translateY}, {translateX}]
      }
    }

    return (
      <View style={styles.container}>
        {this.state.initialised &&
          <View
            style={
              [
                styles.colorPickerContainer,
                { 'backgroundColor': `rgb(${this.state.bgColor[0]}, ${this.state.bgColor[1]}, ${this.state.bgColor[2]})`,
                  'height': this.state.height
                }
              ]}>

              {
                this.state.responders.map((pan, index) => {
                  return (
                    <Animated.View 
                      key={index} 
                      style={[
                        styles.colorPicker,
                        circle[`circleStyle${index}`]]}
                        {...this.state.responders[index].panHandlers}>
                    </Animated.View>
                  )
                })
              }
              {!this.state.hideRgbValues &&
                <View style={styles.colorCodeSection}>
                  <Text style={styles.colorCodeSectionText}>
                    {this.state.bgColor[0]}{' ,  '}
                    {this.state.bgColor[1]}{' ,  '} 
                    {this.state.bgColor[2]}
                  </Text>
                </View>
              }
          </View>
        }
      </View>
    );
  }
}