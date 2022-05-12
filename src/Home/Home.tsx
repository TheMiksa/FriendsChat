import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { forIn } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { MessageForm } from '../common/MessageForm/MessageForm';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBlock: {
    backgroundColor: '#EEEEEE',
    opacity: 0.8,
    margin: 4,
    borderRadius: 2,
    padding: 5,
  },
  messageList: {
    backgroundColor: '#ABCDEF',
    width: '100%',
  },
});

type Message = {
  userId: string,
  id: string,
  message: string,
  msTime: number,
};
type Message2 = {
  userId: string,
  message: string,
  msTime: number,
};


type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export const Home: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    const database = getDatabase();
    const messagesRef = ref(database, 'friends-chat/messages');
    const usersRef = ref(database, '/friens-chat/users');

    onValue(messagesRef, (s) => {
      const v = s.val();

      const newMessages: Array<Message> = [];

      forIn(v, (val: Message2, key: string) => {
        newMessages.push({
          userId: val.userId,
          message: val.message,
          msTime: val.msTime,
          id: key,
        });
      })
      setMessages(newMessages);
    });

    onValue(usersRef, s => {
      const v = s.val();
    });
  }, []);
  

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={(value) => {
          const item: Message = value.item;
          return (
          <View
            key={item.id}
            style={styles.messageBlock}
          >
            <Text>{item.userId}:</Text>
            <Text>{item.message}</Text>
            <Text>{item.msTime}</Text>
          </View>
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