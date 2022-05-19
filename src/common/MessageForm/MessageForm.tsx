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
    maxHeight: 300,
    minHeight: 50,
    paddingRight: 65,
    paddingLeft: 5,
  },
  sendButton: {
    backgroundColor: '#ADBFFF',
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MessageForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  const user = useSelector(userSelector);

  function sendMessage(userName: string, text: string, msTime: number) {
    const database = getDatabase();
    const reference = ref(database, 'friends-chat/messages');
    push(reference, {
      message: text.trim(),
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
        styles={{ container: styles.textFieldContainer, textInput: styles.textField }}
        multiline
      />
      <TouchableOpacity
        onPress={() => sendMessage(user.userName, message, Date.now())}
        style={[styles.sendButton, { opacity: !message.trim() ? 0.2 : 1 }]}
        disabled={!message.trim()}
      >
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  )
};