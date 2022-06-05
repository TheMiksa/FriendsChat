import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "../../App";

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    flex: 1,
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
  const { theme, setTheme } = useContext(ThemeContext);

  const [isEnabled, setIsEnabled] = useState<boolean>(theme.themeType === 'dark');

  const onValueChange: (value: boolean) => void = (value) => {
    const newTheme = value ? 'dark' : 'light';

    setTheme?.(newTheme);
    setIsEnabled(value);
  };
  
  return (
    <View style={[styles.container, {
      backgroundColor: theme.secondaryBackgroundColor,
    }]}>
      <View style={styles.themeContainer}>
        <Text>{theme.themeType} Theme:</Text>
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