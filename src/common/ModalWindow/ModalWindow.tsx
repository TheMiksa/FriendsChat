import { 
  Modal, 
  View, 
  ModalProps, 
  TouchableWithoutFeedback, 
  StyleProp, 
  ViewStyle, 
  StyleSheet,
  TextStyle
 } from "react-native";
import { Button } from '../Button/Button';

type ModalWindowProps =  ModalProps & {
  onPressOutside?: () => void,
  onLeftButtonPress?: () => void,
  onRightButtonPress?: () => void,
  leftButtonTitle?: string,
  rightButtonTitle?: string,
  styles?: {
    modal?: StyleProp<ViewStyle>,
    container?: StyleProp<ViewStyle>,
    leftButton?: { button?: StyleProp<ViewStyle>, title?: StyleProp<TextStyle> },
    rightButton?: { button?: StyleProp<ViewStyle>, title?: StyleProp<TextStyle> },
  },
};

const ownStyles = StyleSheet.create({
  container: { // add other styles
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
      style={[style, styles?.modal]}
      { ...props }
    >
      <TouchableWithoutFeedback
        onPress={onPressOutside}
      >
        <View
        style={[ownStyles.container, styles?.container]}
        >
          {children ? (
            children
          ) : (
            <>
              <Button
                onPress={onLeftButtonPress}
                styles={styles?.leftButton}
              >
                {leftButtonTitle || 'Cancel'}
              </Button>
              <Button
                onPress={onRightButtonPress}
                styles={styles?.rightButton}
              >
                {rightButtonTitle || 'Confirm'}
              </Button>
            </>
            )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    )
};
