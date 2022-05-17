import { Text, View } from 'react-native';
import { useState } from 'react';
import { TextField } from '../common/TextField/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../store/actions';
import { userSelector } from '../store/selectors';
import type { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import styles from './Login.styles';
import { Loading } from '../common/Loading/Loading';
import { loginValidator, passwordValidator } from '../helpers/heplers';
import { Button } from '../common/Button/Button';

type LoginScreenProps = NativeStackNavigationProp<RootStackParamList, 'Login'>

export const Login: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [logining, setLogining] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const store = useSelector(userSelector);
  const dispatch = useDispatch();

  const navigation = useNavigation<LoginScreenProps>();

  const onLogIn = () => {
    setLogining(true);

    const firestore = getFirestore();
    const userRef = doc(firestore, "users", userName);
  
    getDoc(userRef).
    then(snap => {
      if  (snap.exists()) {

        if (snap.data()?.password === password) {

          dispatch(logIn({ userName }));   
          navigation.goBack();

        } else {
          setLogining(false);
          setPasswordError('Password is not correct');
        }
      } else {
        setLogining(false);
        setLoginError(`There is no user ${userName}`);
      }
    }).
    catch(() => {
      setError(true);
      setLogining(false);
    });
  };

  const onSignIn = () => {
    setLogining(true);

    const firestore = getFirestore();
    const userRef = doc(firestore, "users", userName);
  
    getDoc(userRef).
    then(snap => {
      if  (snap.exists()) {
          setLogining(false);
          setLoginError(`User name ${userName} has been already taken`);
      } else {
        setDoc(userRef, {
          userName,
          password,
        }).
        then(() => {
          dispatch(logIn({ userName }));
          navigation.goBack();
        }).
        catch(() => {
          setError(true);
          setLogining(false);
        });
      }
    }).
    catch(() => {
      setError(true);
      setLogining(false);
    });
  };

  const checkValidation = (onValid: () => void) => {
    const validatedLogin = loginValidator(userName);
    const validatedPassword = passwordValidator(password, true);

    if (!validatedLogin.isValid) {
      setLoginError(validatedLogin.errorMessage);
    }
     if (!validatedPassword.isValid) {
      setPasswordError(validatedPassword.errorMessage);
    }

    if (validatedPassword.isValid && validatedLogin.isValid) {
      onValid();
    }}

  if (logining) {
    return (
      <Loading text='...logining' />
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
        onChangeText={(value: string) => {
          setUserName(value.trim());
          setLoginError('');
        }}
        errorMessage={loginError}
        value={userName}
        placeholder="User Name"
      />
      <TextField
        onChangeText={(value: string) => {
          setPassword(value.trim());
          setPasswordError('');
        }}
        errorMessage={passwordError}
        value={password}
        placeholder="Password"
      />
      <View style={styles.buttonsBlock}>
        <Button
          onPress={() => checkValidation(onLogIn)}
          disabled={!!loginError || !!passwordError}
          title="Log in"
        />
        <Button
          onPress={() => checkValidation(onSignIn)}
          disabled={!!loginError || !!passwordError}
          title="Sign in"
        />
      </View>
    </View>
    </View>
  );
};