import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { forIn } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ThemeContext } from '../../App';
import { MessageForm } from '../common/MessageForm/MessageForm';
import { MessageItem } from '../common/MessageItem/MessageItem';
import { messagesRoute } from '../constants';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { userSelector } from '../store/selectors';
import { Loading } from '../common/Loading/Loading';
import { ModaWindow } from '../common/ModalWindow/ModalWindow';


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


export type ChatScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const { theme } = useContext(ThemeContext);
  
  const user = useSelector(userSelector);
  const navigation = useNavigation<ChatScreenProps>();

  useEffect(() => {

    if (true) { // user.userName

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
      setFetching(false);
    });
    } else {
      navigation.navigate('Login');
    }
  }, [user]);

  const removeMessage: (messageId: string) => void = messageId => {
    const database = getDatabase();
    const messageRef = ref(database, `${messagesRoute}/${messageId}`);
    
    remove(messageRef)
    .then(() => {
      setSelectedMessageId('');
    }).
    catch(() => {
      console.log('---something has wrong with message removing!');
    });
  };

  
  const NoMessages: React.ReactElement = (
    <View style={styles.noMessage}>
      <Text>Nobody has sent message yet :(</Text>
    </View>
  )

  if  (fetching) {
    return (
      <Loading />
    );
  }

  return (
    <View style={styles.container}>
      <ModaWindow
        visible={!!selectedMessageId}
        transparent
        onPressOutside={() => setSelectedMessageId('')}
        onLeftButtonPress={() => removeMessage(selectedMessageId)}
        onRightButtonPress={() => setSelectedMessageId('')}
        leftButtonTitle="Remove"
        rightButtonTitle="Cancel"
        title="Remove the message?"
      />
      <FlatList
        ListEmptyComponent={NoMessages}
        inverted
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={(value) => {
          const message: Message = value.item;

          return (
          <TouchableOpacity
            onPress={() => {
              setSelectedMessageId(message.id);
            }} // TODO: change to onLongPress
          >
            <MessageItem message={message} />
          </TouchableOpacity>
        );
      }}
        data={messages}
        style={[styles.messageList, {
          backgroundColor: theme.secondaryBackgroundColor,
        }]}
      />
      <MessageForm />
    <StatusBar style="auto" />
  </View>
  );
};