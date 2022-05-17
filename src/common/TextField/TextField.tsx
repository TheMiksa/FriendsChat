import { View, TextInput, Text, StyleSheet } from "react-native";

type TextFieldProps = {
  onChangeText: (value: string) => void,
  value: string,
  style?: { container?: object, errorMessage?: object, textInput?: object },
  placeholder?: string,
  multiline?: boolean,
  maxLength?: number,
  errorMessage?: string,
  props?: any,
  disabled?: boolean,
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: 200,
  },
  textInput: {
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    padding: 4,
  },
  errorText: {
    marginTop: 2,
    textAlign: 'center',
    color: 'tomato',
  },
});

export const TextField: React.FC<TextFieldProps> = (
  { onChangeText, value, style, placeholder, multiline, maxLength, errorMessage, disabled, ...props},
  ) => (
    <View style={{
      ...styles.container,
      ...style?.container,
    }}>
      <TextInput
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      multiline={multiline}
      maxLength={maxLength}
      style={{
        ...styles.textInput,
        ...(style?.textInput || {}),
      }}
      editable={!disabled}
      {...props}
      />
      {!!errorMessage && (
        <Text
          style={{
            ...styles.errorText,
            ...(style?.errorMessage || {}),
          }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );