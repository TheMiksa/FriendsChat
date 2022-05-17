import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getDatabase, ref, push } from "firebase/database";
import { userSelector } from "../../store/selectors";
import { TextField } from "../TextField/TextField";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFDD',
    width: '100%',
    position: 'relative',
  },
  textFieldContainer: {
    margin: 0,
    width: 'auto',
  },
  textField: {
    width: '100%',
    margin: 0,
    minHeight: 50,
    paddingRight: 65,
    paddingLeft: 5,
  },
  sendButton: {
    backgroundColor: '#DDDFFF',
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MessageForm = () => {
  const [message, setMessage] = useState<string>('');

  const user = useSelector(userSelector);

  function sendMessage(userName: string, text: string, msTime: number) {
    const database = getDatabase();
    const reference = ref(database, 'friends-chat/messages');
    push(reference, {
      message: text,
      userName,
      msTime,
    }).
    then(() => setMessage(''));
  }

  return (
    <View style={styles.container}>
      <TextField
        onChangeText={setMessage}
        value={message}
        style={{ container: styles.textFieldContainer, textInput: styles.textField }}
        multiline
      />
      <TouchableOpacity
        onPress={() => sendMessage(user.userName, message, Date.now())}
        style={styles.sendButton}
      >
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  )
};