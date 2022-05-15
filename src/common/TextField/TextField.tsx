import { TextInput } from "react-native";

type TextFieldProps = {
  onChangeText: (value: string) => void,
  value: string,
  style?: object,
  placeholder?: string,
  multiline?: boolean,
  props?: any,
}

const ownStyles = {
  backgroundColor: '#E0E0E0',
  width: 200,
  borderRadius: 2,
  padding: 4,
  margin: 5,
};

export const TextField: React.FC<TextFieldProps> = (
  { onChangeText, value, style, placeholder, multiline = false, ...props},
  ) => (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      style={{
        ...ownStyles,
        ...style,
      }}
      {...props}
    />
  );