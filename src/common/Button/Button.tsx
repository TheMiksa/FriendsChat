import { StyleSheet, TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  style?: { button?: object, text?: object },
  title?: string,
  disabled?: boolean,
  children?: React.ReactNode | string,
  onPress: ((value: any) => void) | undefined, // check it
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
      {children && !title && typeof children === 'string' ? (
        <Text>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
    );
};