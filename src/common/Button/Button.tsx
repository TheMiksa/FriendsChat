import { StyleSheet, TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  style?: { button?: object, text?: object },
  title?: string,
  disabled?: boolean,
  children?: React.ReactNode,
  onPress: (value: any) => void,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#aeaee0',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
    height: 30,
    padding: 5,
    margin: 5,
    borderRadius: 2,
  },
});

export const Button: React.FC<ButtonProps> = ({ style, disabled, title, children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...disabled ? { opacity: 0.3 } : {},
        ...style?.button,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      {title && !children && (
        <Text style={style?.text}>{title}</Text>
      )}
      {children && children}
    </TouchableOpacity>
    );
};