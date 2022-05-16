import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBlock: {
    borderRadius: 2,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    padding: 5,
  },
  buttonsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 200,
  },
  loginButton: {
    backgroundColor: '#aeaee0',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    height: 30,
    padding: 5,
    margin: 5,
    borderRadius: 2,
  },
  error: {
    color: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;