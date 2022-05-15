import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { forIn } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { MessageForm } from '../common/MessageForm/MessageForm';
import { MessageItem } from '../common/MessageItem/MessageItem';
import { usersRoute, messagesRoute } from '../constants';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userSelector } from '../store/selectors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageList: {
    backgroundColor: '#ABCDEF',
    width: '100%',
  },
  noMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export type Message = {
  userName: string,
  id: string,
  message: string,
  msTime: number,
};
type Message2 = {
  userName: string,
  message: string,
  msTime: number,
};


type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export const Home: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  
  const user = useSelector(userSelector);
  const navigation = useNavigation<HomeScreenProps>();

  useEffect(() => {

    if (user.userName) {

    const database = getDatabase();
    const messagesRef = ref(database, messagesRoute);

    onValue(messagesRef, (s) => {
      const v = s.val();

      const newMessages: Array<Message> = [];

      forIn(v, (val: Message2, key: string) => {
        newMessages.push({
          userName: val.userName,
          message: val.message,
          msTime: val.msTime,
          id: key,
        });
      })
      setMessages(newMessages.reverse());
    });
    } else {
      navigation.navigate('Login');
    }
  }, [user]);
  
  const NoMessages = (
    <View style={styles.noMessage}>
      <Text>Nobody has sent message :(</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={NoMessages}
        inverted
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={(value) => {
          const item: Message = value.item;

          return (
          <MessageItem item={item} />
        );
      }}
        data={messages}
        style={styles.messageList}
      />
      <MessageForm />
    <StatusBar style="auto" />
  </View>
  );
};