import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TextField } from '../common/TextField/TextField';
import { ref, push, getDatabase } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUser } from '../store/actions';
import { userSelector } from '../store/selectors';


export const Login = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [key, setKey] = useState<any>('');

  const store = useSelector(userSelector);
  const dispatch = useDispatch();

  const onLogin = () => {
    const database = getDatabase();
    const reference = ref(database, '/friens-chat/users');

    push(reference, {
      userName,
      password,
    }).
    then(snap => {
      const snapKey: string = snap.key || '';
      setKey(snapKey);
      dispatch(setUser({
        userId: snapKey,
        userName,
      }));
    });
  };

  return (
    <View
      style={{
        borderRadius: 2,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        padding: 5,
      }}
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
        style={{
          backgroundColor: '#aeaee0',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 30,
          margin: 5,
          borderRadius: 2,
        }}
        onPress={onLogin}
      >
        <View><Text>Login</Text></View>
      </TouchableOpacity>
      <Text>{key}</Text>
      <Text>{JSON.stringify(store)}</Text>
    </View>
  );
};