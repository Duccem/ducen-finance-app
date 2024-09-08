import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { cn } from '../utils/cn';

interface InputFieldProps extends TextInputProps {
  Icon?: React.ComponentType<any>;
  secureTextEntry?: boolean;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  error?: string | null;
  type?: 'text' | 'email' | 'password' | 'number';
}

export const Input = ({
  Icon,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  error,
  type = 'text',
  placeholder,
  value,
  ...props
}: InputFieldProps) => {
  const [visible, setVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0));
  const returnAnimatedTitleStyles: StyleProp<TextStyle> = {
    fontSize: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
      extrapolate: 'clamp',
    }) as unknown as number,
    transform: [
      {
        translateY: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const onFocusAnimation = () => {
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };
  const onBlurAnimation = () => {
    if (!value) {
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="w-full"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="my-2">
          <View
            className={cn(
              'flex flex-row justify-start items-center relative bg-background-third rounded-2xl h-16 border border-background-secondary',
              containerStyle,
            )}
          >
            {Icon && (
              <View
                className={cn(
                  'w-6 h-6 justify-center items-center p-2 ml-4',
                  iconStyle,
                )}
              >
                <Icon />
              </View>
            )}
            <TextInput
              className={cn(
                'rounded-full p-2 pl-4 font-NunitoSemiBold text-[15px] flex-1',
                inputStyle,
              )}
              placeholderTextColor={'#93969e'}
              cursorColor={'#000'}
              secureTextEntry={type === 'password' && !visible ? true : false}
              value={value}
              onFocus={(e) => {
                onFocusAnimation();
                props.onFocus && props.onFocus(e);
              }}
              onBlur={(e) => {
                onBlurAnimation();
                props.onBlur && props.onBlur(e);
              }}
              {...props}
            />
            {type === 'password' && (
              <View className="w-6 h-7 absolute right-2 justify-center items-center p-2 mr-4">
                <TouchableOpacity
                  onPress={() => setVisible((value) => !value)}
                  className="flex justify-center items-center"
                  activeOpacity={1}
                >
                  {visible ? (
                    <FontAwesomeIcon icon={faEye} size={20} color="#4b5563" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      size={20}
                      color="#4b5563"
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            {placeholder && (
              <Animated.Text
                style={returnAnimatedTitleStyles}
                className="absolute left-4  text-md text-gray-600"
              >
                {placeholder}
              </Animated.Text>
            )}
            {error && (
              <Text className="text-xs text-foreground-primary absolute bottom-[-17px] right-0 mr-2">
                {error}
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
