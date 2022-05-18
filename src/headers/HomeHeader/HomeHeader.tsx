import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from '../../common/Button/Button';
import { HomeScreenProps } from '../../Home/Home';
import { logOut } from '../../store/actions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    minHeight: 70,
    padding: 10,
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: 200,
    height: 30,
    margin: 5,
    padding: 5,
    fontSize: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'rgba(55, 155, 115, 0.7)',
  },
});

export const HomeHeader = () => {
  const navigation = useNavigation<HomeScreenProps>();
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logOut());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}><Text style={styles.title}>Chat room</Text></View>
      <Button style={{ button: styles.button }} onPress={onLogOut} title="Log out" />
    </View>
  );
};
