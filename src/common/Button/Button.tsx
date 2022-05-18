import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  styles?: { button?: StyleProp<ViewStyle>, title?: StyleProp<TextStyle> },
  title?: string,
  children?: React.ReactNode | string,
};

const ownStyles = StyleSheet.create({
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

export const Button: React.FC<ButtonProps> = ({ style, styles, disabled, title, children, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        ownStyles.button,
        styles?.button,
        style,
        disabled && { opacity: 0.3 },
      ]}
      disabled={disabled}
      { ...props }
    >
      {title && !children && (
        <Text style={styles?.title}>{title}</Text>
      )}
      {children && !title && typeof children === 'string' ? (
        <Text style={styles?.title}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
    );
};