import 'react-native-gesture-handler';
import { initializeApp } from 'firebase/app';
import { Login } from './src/Login/Login';
import { Home } from './src/Home/Home';
import firebaseConfig from './src/firebase/firebaseConfig';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeHeader } from './src/headers/HomeHeader/HomeHeader';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text } from 'react-native';

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
};

initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawHome = () => (
  <View>
    <Text>Draw Home!</Text>
  </View>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            header: () => (
              <HomeHeader />
            ),
          }} 
          />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
        {/* <Drawer.Navigator>
          <Drawer.Screen name='Home' component={DrawHome} />
        </Drawer.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
}

