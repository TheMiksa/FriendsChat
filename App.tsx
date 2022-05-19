import 'react-native-gesture-handler';
import { initializeApp } from 'firebase/app';
import { Login } from './src/Login/Login';
import { Chat } from './src/Chat/Chat';
import firebaseConfig from './src/firebase/firebaseConfig';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeHeader } from './src/headers/HomeHeader/HomeHeader';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { Button } from './src/common/Button/Button';
import { logOut } from './src/store/actions';
import { Settings } from './src/Settings/Settings';

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
};

initializeApp(firebaseConfig);

// TODO: add types

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logOut());
    navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView { ...props}>
      <DrawerItemList { ...props } />
      <Button
        styles={{ button: { backgroundColor: 'rgba(55, 155, 115, 0.7)' } }} 
        onPress={onLogOut} 
        title="Log out" 
      />
    </DrawerContentScrollView>
  )
};


const HomeDrawer = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name='Chat'
      component={Chat}
      options={{
        headerTitle: () => (<HomeHeader title='FriendsChat' />),
      }}      
      />
      <Drawer.Screen
        name='Settings'
        component={Settings}
        options={{
          headerTitle: () => (<HomeHeader title='Settings' />),
        }}      
        />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={HomeDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

