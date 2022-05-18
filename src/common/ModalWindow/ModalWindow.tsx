import { 
  Modal, 
  View, 
  ModalProps, 
  TouchableWithoutFeedback, 
  StyleProp, 
  ViewStyle, 
  StyleSheet
 } from "react-native";
import styles from "../../Login/Login.styles";
import { Button } from '../Button/Button';

type ModalWindowProps =  ModalProps & {
  onPressOutside?: () => void,
  onLeftButtonPress?: () => void,
  onRightButtonPress?: () => void,
  leftButtonTitle?: string,
  rightButtonTitle?: string,
  styles?: { // add these styles
    modal?: StyleProp<ViewStyle> | undefined, // check dif
    container?: StyleProp<ViewStyle> | object, // check dif
    leftButton?: StyleProp<ViewStyle> | undefined,
    rightButton?:StyleProp<ViewStyle> | undefined,
  },
};

const ownStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
});

export const ModaWindow: React.FC<ModalWindowProps> = (
  { 
    children, animationType, 
    styles, style, 
    onPressOutside, 
    onLeftButtonPress, 
    onRightButtonPress, 
    leftButtonTitle, 
    rightButtonTitle, 
    ...props
  },
  ) => {

  return (
    <Modal
      animationType={animationType || 'slide'}
      style={StyleSheet.compose(style, (styles?.modal || {}))}
      { ...props }
    >
      <TouchableWithoutFeedback
        onPress={onPressOutside}
      >
        <View
        style={StyleSheet.compose(ownStyles.container, (styles?.container || {}))}
        >
          {children ? (
            children
          ) : (
            <View>
              <Button
                onPress={onLeftButtonPress}
              >
                {leftButtonTitle || 'Cancel'}
              </Button>
              <Button
                onPress={onRightButtonPress}
              >
                {rightButtonTitle || 'Confirm'}
              </Button>
            </View>
            )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    )
};
