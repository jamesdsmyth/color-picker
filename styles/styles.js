import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width
  },
  colorCodeSection: {
    position: 'absolute',
    display: 'flex',
    height: 80,
    bottom: 0,
    left: 0,
    width: window.width,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  colorCodeSectionText: {
    fontSize: 40
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
    backgroundColor: '#ffffff',
    position: 'absolute'
  }
});

export default styles;