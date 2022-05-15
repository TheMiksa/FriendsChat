import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logining: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type LoadingProps = {
  text?: string,
}

export const Loading: React.FC<LoadingProps> = ({ text = '...Loading' }) => (
  <View style={styles.logining}>
    <Text>{text}</Text>
  </View>
);