import { initializeApp } from 'firebase/app';
import { Login } from './src/Login/Login';
import { Home } from './src/Home/Home';
import firebaseConfig from './src/firebase/firebaseConfig';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
};

initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

