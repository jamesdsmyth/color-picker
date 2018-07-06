import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const constants = {
  purple: 'rgb(93,36,151)', // -10 - -1
  blue: 'rgb(47,53,143)', // 0 -5
  lightBlue: 'rgb(10,86,162)', // 6 - 10
  lightGreen: 'rgb(26,167,157)', // 11 - 15
  green: 'rgb(201,218,85)', // 16 - 20
  yellow: 'rgb(254,240,54)', // 21 - 25
  lightOrange: 'rgb(254,196,46)', // 26 - 30
  orange: 'rgb(253,147,38)', // 31 - 35
  darkOrange: 'rgb(241,102,49)', // 36 - 40
  red: 'rgb(235,33,47)', // 41 - 50,
  white: 'rgb(255,255,255)'
}
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: constants.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width
  },
  section: {
    width: window.width,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: constants.white
  },
  sectionInner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionNow: {
    flex: 5,
    borderTopWidth: 0,
    justifyContent: 'center'
  },
  sectionLater: {
    flex: 1,
  },

  // ColorPicker component
  colorPickerContainer: {
    flex: 1,
    width: window.width
  },
  colorPicker: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: constants.white,
    position: 'absolute'
  },

  section90: {
    backgroundColor: constants.purple
  },
  section91: {
    backgroundColor: constants.purple
  },
  section92: {
    backgroundColor: constants.purple
  },
  section93: {
    backgroundColor: constants.purple
  },
  section94: {
    backgroundColor: constants.purple
  },
  section95: {
    backgroundColor: constants.purple
  },
  section96: {
    backgroundColor: constants.purple
  },
  section97: {
    backgroundColor: constants.purple
  },
  section98: {
    backgroundColor: constants.purple
  },
  section99: {
    backgroundColor: constants.purple
  },
  
  section0: {
    backgroundColor: constants.blue
  },
  section1: {
    backgroundColor: constants.blue
  },
  section2: {
    backgroundColor: constants.blue
  },
  section3: {
    backgroundColor: constants.blue
  },
  section4: {
    backgroundColor: constants.blue
  },
  section5: {
    backgroundColor: constants.blue
  },

  section6: {
    backgroundColor: constants.lightBlue
  },
  section7: {
    backgroundColor: constants.lightBlue
  },
  section8: {
    backgroundColor: constants.lightBlue
  },
  section9: {
    backgroundColor: constants.lightBlue
  },
  section10: {
    backgroundColor: constants.lightBlue
  },

  section11: {
    backgroundColor: constants.lightGreen
  },
  section12: {
    backgroundColor: constants.lightGreen
  },
  section13: {
    backgroundColor: constants.lightGreen
  },
  section14: {
    backgroundColor: constants.lightGreen
  },
  section15: {
    backgroundColor: constants.lightGreen
  },

  section16: {
    backgroundColor: constants.green
  },
  section17: {
    backgroundColor: constants.green
  },
  section18: {
    backgroundColor: constants.green
  },
  section19: {
    backgroundColor: constants.green
  },
  section20: {
    backgroundColor: constants.green
  },

  section21: {
    backgroundColor: constants.yellow
  },
  section22: {
    backgroundColor: constants.yellow
  },
  section23: {
    backgroundColor: constants.yellow
  },
  section24: {
    backgroundColor: constants.yellow
  },
  section25: {
    backgroundColor: constants.yellow
  },

  section26: {
    backgroundColor: constants.lightOrange
  },
  section27: {
    backgroundColor: constants.lightOrange
  },
  section28: {
    backgroundColor: constants.lightOrange
  },
  section29: {
    backgroundColor: constants.lightOrange
  },
  section30: {
    backgroundColor: constants.lightOrange
  },

  section31: {
    backgroundColor: constants.orange
  },
  section32: {
    backgroundColor: constants.orange
  },
  section33: {
    backgroundColor: constants.orange
  },
  section34: {
    backgroundColor: constants.orange
  },
  section35: {
    backgroundColor: constants.orange
  },

  section36: {
    backgroundColor: constants.darkOrange
  },
  section37: {
    backgroundColor: constants.darkOrange
  },
  section38: {
    backgroundColor: constants.darkOrange
  },
  section39: {
    backgroundColor: constants.darkOrange
  },
  section40: {
    backgroundColor: constants.darkOrange
  },

  section40: {
    backgroundColor: constants.red
  },
  section41: {
    backgroundColor: constants.red
  },
  section42: {
    backgroundColor: constants.red
  },
  section43: {
    backgroundColor: constants.red
  },
  section44: {
    backgroundColor: constants.red
  },
  section45: {
    backgroundColor: constants.red
  },

  section46: {
    backgroundColor: constants.red
  },
  section47: {
    backgroundColor: constants.red
  },
  section48: {
    backgroundColor: constants.red
  },
  section49: {
    backgroundColor: constants.red
  },
  section50: {
    backgroundColor: constants.red
  },
  
  sectionText: {
    fontSize: 20,
    color: constants.white,
    lineHeight: 50
  },
  loadingText: {
    fontSize: 20,
    color: constants.lightGreen
  },
  warningText: {
    fontSize: 20,
    color: constants.red
  }
});

export default styles;