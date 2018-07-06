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
      bgColor: [135, 12, 93],
      height: Dimensions.get('window').height,
      circle0PosX: 0,
      circle0PosY: 0,
      circle1PosX: 0,
      circle1PosY: 0,
      circle2PosX: 0,
      circle2PosY: 0,
      pans: [this._panResponder, this._panResponder1, this._panResponder2]
    }
  }

  componentWillMount() {
    this.attachPanHandlerEvents();
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
          // here we are setting the position of the gesture move. This will then re-render the view with the correct
          //  background color
          this.setState({
            [`circle${i}PosX`]: gestureState.moveX,
            [`circle${i}PosY`]: gestureState.moveY
          });
  
          Animated.event([null, {
            dx: selector.x,
            dy: selector.y
          }])(e, gestureState);
  
          // now we can call the background color and change it.
          this.updateBackgroundColor();
        },

        onPanResponderRelease: (e, gestureState) => {
          
          console.log(gestureState.moveX, gestureState.moveY)
          if(gestureState.moveY > 300) {
            Animated.spring(selector, {
              toValue: { x: gestureState.moveX, y: 300 },
              friction: 5
            }).start();

            this.setState({
              [`circle${i}PosX`]: gestureState.moveX,
              [`circle${i}PosY`]: 300
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
      circleStyle0: {},
      circleStyle1: {},
      circleStyle2: {},
      circleTop0: 0,
      circleTop1: 0,
      circleTop2: 0
    }

    // here we are looping through each pan and getting the translate and translateY for each one
    for(let i = 0; i < this.state.pans.length; i++) {
      const currentPan = pan[Object.keys(pan)[i]];
      const [translateX, translateY] = [currentPan.x, currentPan.y];
      circle[`circleStyle${i}`] = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
      circle[`Top${i}`] = translateY;

      console.log(circle)
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
                      { 'top': circle[`circleTop${index}`] },
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