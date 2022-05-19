import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import type { Message } from "../../Chat/Chat";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    opacity: 0.8,
    margin: 4,
    borderRadius: 2,
    padding: 5,
  },
});

type MessageItemProps = {
  message: Message,
}

export const MessageItem: React.FC<MessageItemProps> = (props) => {
  const { message } = props;
  // Move Time to right corner
  // Change Time format
  // Implement logic for switching between different time formats (with year, without year etc.)

  return (
    <View
      key={message.id}
      style={styles.container}
    >
      <Text>{message.userName}:</Text>
      <Text>{message.message}</Text>
      <Text>{moment(message.msTime).format('YYYY MM DD : HH:MM:ss.SSS')}</Text>
    </View>
  );
}