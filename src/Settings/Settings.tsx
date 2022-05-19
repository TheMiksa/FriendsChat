import { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flex: 1,
    backgroundColor: '#DDD',
    borderRadius: 5,
  },
  themeContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const Settings = () => {
  const [isEnabled, setIsenabled] = useState<boolean>(false);

  const onValueChange: (value: boolean) => void = () => {
    // do something;
    setIsenabled(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <View style={styles.themeContainer}>
        <Text>Dark Theme:</Text>
        <Switch 
          onValueChange={onValueChange}
          value={isEnabled}
          thumbColor={isEnabled ? 'olive' : '#A6A6A6'}
          trackColor={{
            true: '#123321',
            false: '#666666',
          }}
          ios_backgroundColor="#F6F6F6"
        />
      </View>
    </View>
  );
};