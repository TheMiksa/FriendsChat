import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, orderByKey } from 'firebase/database';
import { forIn } from 'lodash';
import { Login } from './src/Login/Login';
import firebaseConfig from './src/firebase/firebaseConfig';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const app = initializeApp(firebaseConfig);

function sendMessage(userId: string, text: string, msTime: number) {
  const database = getDatabase();
  const reference = ref(database, 'friends-chat/messages');
  push(reference, {
    message: text,
    userId,
    msTime,
  });
}

const getMessages = () => {
  const db = getDatabase();


  console.log('----db: ', db);
}

type Message = {
  userId: string,
  id: string,
  message: string,
  msTime: number,
}
type Message2 = {
  userId: string,
  message: string,
  msTime: number,
}
export default function App() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [text, setText] = useState('34234sfsfsdfsfsfsdfdsf');
  const [userName, setUserName] = useState('');
  const [isNameEditing, setIsNameEditing] = useState(true);

  
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
    <Provider store={store}>
      <View style={styles.container}>
      {/* <View>
        {userName.length < 1 || isNameEditing ? (
          <View
            style={{
              backgroundColor: '#f0f0f0',
            }}
          >
          <TextInput
          onChangeText={(value: string) => setUserName(value.trim())}
          value={userName}
          style={{
            backgroundColor: '#e0e0e0',
          }}
          />
          <TouchableOpacity
          style={{
            backgroundColor: '#eeee0',
          }}
          onPress={() => setIsNameEditing(false)}
        >
          <Text>Set your Name</Text>
        </TouchableOpacity>
        </View>
        ) : (
          <View>
          <Text>{userName}</Text>
          <TouchableOpacity
            onPress={() => setIsNameEditing(true)}
          >
            <Text>Edit Name</Text>
          </TouchableOpacity>
      <View style={{
        height: 500,
      }}>
      <Text>Messages:</Text>
        <FlatList
          renderItem={(value) => {
            const item: Message = value.item;
            return (
            <View
              key={item.id}
              style={{
                backgroundColor: 'tomato',
                margin: 4,
              }}
            >
              <Text>{item.userId}:</Text>
              <Text>{item.message}</Text>
              <Text>{item.msTime}</Text>
            </View>
          );
        }}
          data={messages}
          style={{
            backgroundColor: 'olive',
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => sendMessage(userName, text, Date.now())}
      >
        <Text>Send message</Text>
      </TouchableOpacity>
          </View>
        )}
      </View> */}
      <Login />
      <StatusBar style="auto" />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
