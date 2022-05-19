import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    maxWidth: '100%',
    width: 500,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});

type HomeHeaderType = {
  title: string,
};

export const HomeHeader: React.FC<HomeHeaderType> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
