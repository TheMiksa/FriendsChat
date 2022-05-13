import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextField } from '../common/TextField/TextField';
import { ref, push, getDatabase } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/actions';
import { userSelector } from '../store/selectors';
import type { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usersRoute } from '../constants/routesAPI';

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
});

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>

export const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const store = useSelector(userSelector);
  const dispatch = useDispatch();

  const navigation = useNavigation<LoginScreenProps>();

  const onLogin = () => {
    const database = getDatabase();
    const reference = ref(database, usersRoute);

    push(reference, {
      userName,
      password,
    }).
    then(snap => {
      const snapKey: string = snap.key || '';

      dispatch(setUser({
        userId: snapKey,
        userName,
      }));

      navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.container}>
      <View
      style={styles.loginBlock}
    >
      <TextField
        onChangeText={(value: string) => setUserName(value.trim())}
        value={userName}
        placeholder="User Name"
      />
      <TextField
        onChangeText={(value: string) => setPassword(value.trim())}
        value={password}
        placeholder="Password"
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onLogin}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};