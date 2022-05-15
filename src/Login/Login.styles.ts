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
  loginButton: {
    backgroundColor: '#aeaee0',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
    margin: 5,
    borderRadius: 2,
  },
  logining: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;