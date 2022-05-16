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
  error: {
    color: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;