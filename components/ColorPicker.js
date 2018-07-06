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
      scale: new Animated.Value(1),
      bgColor: [],
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      circle0PosY: 0,
      circle1PosY: 0,
      circle2PosY: 0,
      pans: [this._panResponder, this._panResponder1, this._panResponder2]
    }
  }

  componentWillMount() {
    this.randomiseColors();
    this.attachPanHandlerEvents();
  }

  randomiseColors() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    bgColor = [r, g, b];

    this.setState({
      bgColor
    })
  }

  // using PanResponders built in functions, we will set up all the event listeners here
  attachPanHandlerEvents() {
    for(let i = 0; i < this.state.pans.length; i++) {

      const selector = this.state.pan[Object.keys(this.state.pan)[i]];

      this.state.pans[i] = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        // Initially, set the value of x and y to 0 (the center of the screen)
        onPanResponderGrant: (e, gestureState) => {
          selector.setOffset({x: selector.x._value, y: selector.y._value});
          // selector.setValue({x: 0, y: 0});
        },

        onPanResponderMove: (e, gestureState) => {
          // here we are setting the position of the gesture move. 
          // This will then re-render the view with the correct
          // background color
          this.setState({
            [`circle${i}PosY`]: gestureState.moveY
          });
  
          Animated.event([null, {
            // dx: selector.x,
            dy: selector.y
          }])(e, gestureState);
  
          // now we can call the background color and change it.
          this.updateBackgroundColor();
        },

        onPanResponderRelease: (e, gestureState) => {

          const boundaryBottom = Dimensions.get('window').height - 200;
          const boundaryTop = 100;

          if(gestureState.moveY > boundaryBottom) {
            Animated.spring(selector, {
              toValue: { y: boundaryBottom, x: 0 },
              friction: 10
            }).start();

            this.setState({
              [`circle${i}PosY`]: boundaryBottom
            });
          }

          if(gestureState.moveY < boundaryTop) {
            Animated.spring(selector, {
              toValue: { y: boundaryTop, x: 0 },
              friction: 10
            }).start();

            this.setState({
              [`circle${i}PosY`]: boundaryTop
            });
          }


          selector.flattenOffset();
          this.updateBackgroundColor();
        }
      });
    }
  }

  // getting the correct RGB values using the position of each of the circles
  updateBackgroundColor() {
    const colors = 255;
    const h = this.state.height;
    const r = Math.round((colors / h) * this.state.circle0PosY);
    const g = Math.round((colors / h) * this.state.circle1PosY);
    const b = Math.round((colors / h) * this.state.circle2PosY);

    this.setState({
      bgColor: [r, g, b]
    });
  }

  render() {
    const { pan, scale } = this.state;
    const rotate = '0deg';
    let circle = {
      left0: (this.state.width / 4) - 25,
      left1: (this.state.width / 2) - 25,
      left2: ((this.state.width / 4) * 3) - 25,
    }

    // here we are looping through each pan and getting the translate and translateY for each one
    for(let i = 0; i < this.state.pans.length; i++) {
      const currentPan = pan[Object.keys(pan)[i]];
      const [translateX, translateY] = [currentPan.x, currentPan.y];
      circle[`circleStyle${i}`] = {
        transform: [{translateX}, {translateY}, {rotate}, {scale}],
        left: circle[`left${i}`]
      }
    }

    return (
      <View style={styles.container}>
        <View
          style={
            [
              styles.colorPickerContainer,
              { 'backgroundColor': `rgb(${this.state.bgColor[0]}, ${this.state.bgColor[1]}, ${this.state.bgColor[2]})`}
            ]}>

            {
              this.state.pans.map((pan, index) => {

                return (
                  <Animated.View 
                    key={index} 
                    style={[
                      styles.colorPicker,
                      circle[`circleStyle${index}`]]}
                      {...this.state.pans[index].panHandlers}>
                    <Text>
                      {index === 0 && 'R'}
                      {index === 1 && 'G'}
                      {index === 2 && 'B'}
                    </Text>
                  </Animated.View>
                )
              })
            }
            <Text>{this.state.bgColor[0]} {this.state.bgColor[1]} {this.state.bgColor[2]}</Text>
        </View>
      </View>
    );
  }
}