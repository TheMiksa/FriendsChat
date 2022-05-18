import { View, TextInput, Text, StyleSheet, TextInputProps, StyleProp, ViewStyle, TextStyle } from "react-native";

type TextFieldProps = TextInputProps & {
  styles?: {
    container?: StyleProp<ViewStyle>,
    errorMessage?: StyleProp<TextStyle>,
    textInput?: StyleProp<TextStyle>,
  },
  errorMessage?: string,
  disabled?: boolean,
  inputRef?: (input: any) => void,
};

const ownStyles = StyleSheet.create({
  container: {
    margin: 5,
    width: 200,
  },
  textInput: {
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    padding: 4,
  },
  errorMessage: {
    marginTop: 2,
    textAlign: 'center',
    color: 'tomato',
  },
});

export const TextField: React.FC<TextFieldProps> = (
  { styles, style, errorMessage, disabled, inputRef, ...props },
  ) => (
    <View style={[ownStyles.container, styles?.container]}>
      <TextInput
      style={[ownStyles.textInput, style, styles?.textInput]}
      editable={!disabled}
      ref={inputRef}
      {...props}
      />
      {!!errorMessage && (
        <Text
          style={[ownStyles.errorMessage, styles?.errorMessage]}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
  