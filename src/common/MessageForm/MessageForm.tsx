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
    height: 50,
  },
  textField: {
    width: '100%',
    margin: 0,
    height: 50,
  },
  sendButton: {
    backgroundColor: '#DDDFFF',
    position: 'absolute',
    right: 0,
    height: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MessageForm = () => {
  const [message, setMessage] = useState<string>('');

  const user = useSelector(userSelector);

  function sendMessage(userId: string, text: string, msTime: number) {
    const database = getDatabase();
    const reference = ref(database, 'friends-chat/messages');
    push(reference, {
      message: text,
      userId,
      msTime,
    }).
    then(() => setMessage(''));
  }

  return (
    <View style={styles.container}>
      <TextField
        onChangeText={setMessage}
        value={message}
        style={styles.textField}
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