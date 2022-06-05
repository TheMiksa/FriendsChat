import 'react-native-gesture-handler';

import { createContext, useContext, useEffect, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

import { Login } from './src/Login/Login';
import { Chat } from './src/Chat/Chat';
import firebaseConfig from './src/firebase/firebaseConfig';
import { store } from './src/store/store';
import { HomeHeader } from './src/headers/HomeHeader/HomeHeader';
import { Button } from './src/common/Button/Button';
import { logOut } from './src/store/actions';
import { Settings } from './src/Settings/Settings';
import { theme } from './src/constants/theme';
import type { Theme } from './src/constants/theme';
import { Loading } from './src/common/Loading/Loading';

export type RootStackParamList = {
  Home: undefined,
  Login: undefined,
};

initializeApp(firebaseConfig);

// TODO: add types
type ThemeContextType = {
  theme: Theme,
  setTheme: (themeType: 'light' | 'dark') => void,
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: theme.light,
  setTheme: () => {},
});

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const onLogOut = () => {

    props.navigation.closeDrawer();
    dispatch(logOut());
    props.navigation.navigate('Login');
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.primaryBackgroundColor,
    }}>
      <DrawerContentScrollView {...props} >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Button
        styles={{ button: { backgroundColor: theme.secondaryBackgroundColor } }}
        onPress={onLogOut}
        title="Log out"
      />
    </View>
  )
};


const HomeDrawer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name='Chat'
        component={Chat}
        options={{
          headerTitle: () => (<HomeHeader title='FriendsChat' />),
          headerStyle: {
            backgroundColor: theme.primaryBackgroundColor,
          },
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={Settings}
        options={{
          headerTitle: () => (<HomeHeader title='Settings' />),
          headerStyle: {
            backgroundColor: theme.primaryBackgroundColor,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme.light);
  const colorScheme = useColorScheme();

  useEffect(() => {
    try {
      AsyncStorage.getItem('@theme_Key').
        then(storedTheme => {
          if (storedTheme === null) {
            AsyncStorage.setItem('@theme_Key', colorScheme || 'light');
            setCurrentTheme(theme[colorScheme === 'dark' ? 'dark' : 'light']);
          } else {
            setCurrentTheme(theme[storedTheme === 'dark' ? 'dark' : 'light']);
          }

          setLoading(false);
        })

    } catch (error) {
      console.log('App -> error: ', error);
    }

  });

  const setTheme: (themeType: 'light' | 'dark') => void = (themeType) => {

    try {
      AsyncStorage.setItem('@theme_Key', themeType).
      then(() => {
        setCurrentTheme(theme[themeType]);
      });
    } catch (error) {
      console.log('App -> setTheme -> error: ', error);
    }
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      setTheme,
    }}>
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
    </ThemeContext.Provider>
  );
}

