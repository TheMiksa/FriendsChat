import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TextField } from '../common/TextField/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../store/actions';
import { userSelector } from '../store/selectors';
import type { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import styles from './Login.styles';

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>

export const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [logining, setLogining] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const store = useSelector(userSelector);
  const dispatch = useDispatch();

  const navigation = useNavigation<LoginScreenProps>();

  const onLogin = () => {

    setLogining(true);
    const firestore = getFirestore();

    setDoc(doc(firestore, "users", userName), {
      userName,
      password,
    }).
    then(() => {
      dispatch(logIn({ userName }));

      navigation.navigate('Home');
    }).
    catch(() => {
      setError(true);
      setLogining(false);
    });
  };

  if (logining) {
    return (
      <View style={styles.logining}>
        <Text>...logining</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View
      style={styles.loginBlock}
    >
      {error && (
        <Text style={{ color: 'tomato' }}>Something has wrong, try again later</Text>
      )}
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