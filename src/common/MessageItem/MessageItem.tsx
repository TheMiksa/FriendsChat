import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import type { Message } from "../../Home/Home";

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
  item: Message,
}

export const MessageItem = (props: MessageItemProps) => {
  const { item } = props;

  return (
    <View
      key={item.id}
      style={styles.container}
    >
      <Text>{item.userId}:</Text>
      <Text>{item.message}</Text>
      <Text>{moment(item.msTime).format('YYYY MM DD : HH:MM:ss.SSS')}</Text>
    </View>
  );
}