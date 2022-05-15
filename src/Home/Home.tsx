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
    const messagesRef = ref(database, messagesRoute);
    const usersRef = ref(database, usersRoute);

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

    // onValue(usersRef, s => {
    //   const v = s.val();
    // });
  }, []);
  
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
        data={messages.reverse()}
        style={styles.messageList}
      />
      <MessageForm />
    <StatusBar style="auto" />
  </View>
  );
};