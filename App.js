import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ColorPicker from './components/ColorPicker';

export default class App extends Component {
  constructor() {
    super();
  }

  getColor(color) {
    console.log(color);
  }

  render() {
    return (
      <View style={styles.container}>
        <ColorPicker 
          hideRgbValues
          // height={400}
          returnColor={this.getColor}
          // color={[0, 25, 134]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
