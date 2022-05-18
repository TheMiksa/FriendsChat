import { 
  Modal, 
  View, 
  ModalProps, 
  TouchableWithoutFeedback, 
  StyleProp, 
  ViewStyle, 
  StyleSheet,
  TextStyle,
  Text,
 } from "react-native";
import { Button } from '../Button/Button';

type ModalWindowProps =  ModalProps & {
  onPressOutside?: () => void,
  onLeftButtonPress?: () => void,
  onRightButtonPress?: () => void,
  leftButtonTitle?: string,
  rightButtonTitle?: string,
  title?: string,
  styles?: {
    modal?: StyleProp<ViewStyle>,
    container?: StyleProp<ViewStyle>,
    modalCard?: StyleProp<ViewStyle>,
    title?: StyleProp<TextStyle>,
    buttonsBock?: StyleProp<ViewStyle>,
    leftButton?:StyleProp<ViewStyle> ,
    leftButtonTitle?: StyleProp<TextStyle> ,
    rightButton?: StyleProp<ViewStyle>,
    rightButtonTitle?: StyleProp<TextStyle>,
  },
};

const ownStyles = StyleSheet.create({
  container: { // add other styles
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: 150,
    padding: 10,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  title: {

  },
  buttonsBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {

  },
  leftButtonTitle: {

  },
  rightButton: {

  },
  rightButtonTitle: {

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
    title,
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
           <View
            style={[ownStyles.modalCard, styles?.modalCard]}
           >
             {title && (
               <Text style={[ownStyles.title, styles?.title]}>{title}</Text>
             )}
             <View
              style={[ownStyles.buttonsBlock, styles?.buttonsBock]}
            >
              <Button
                onPress={onLeftButtonPress}
                styles={{
                  button: StyleSheet.flatten([ownStyles.leftButton, styles?.leftButton]),
                  title: StyleSheet.flatten([ownStyles.leftButtonTitle, styles?.leftButtonTitle]),
                }}
              >
                {leftButtonTitle || 'Cancel'}
              </Button>
              <Button
                onPress={onRightButtonPress}
                styles={{
                  button: StyleSheet.flatten([ownStyles.rightButton, styles?.rightButton]),
                  title: StyleSheet.flatten([ownStyles.rightButtonTitle, styles?.rightButtonTitle]),
                }}
              >
                {rightButtonTitle || 'Confirm'}
              </Button>
            </View>
           </View>
            )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    )
};
