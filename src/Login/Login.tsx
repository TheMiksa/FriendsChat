import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TextField } from '../common/TextField/TextField';

export const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const onLogin = () => {};

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
    </View>
  );
};