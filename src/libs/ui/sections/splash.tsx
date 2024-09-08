import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import Animated, { FadeOut } from 'react-native-reanimated';

export const AnimationScreen = ({
  finish,
  appReady,
}: {
  finish: (isCancelled: boolean) => void;
  appReady: boolean;
}) => {
  const animation = useRef<LottieView>(null);
  return (
    <Animated.View
      exiting={FadeOut.duration(300)}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3a72ff',
      }}
    >
      <LottieView
        style={{
          width: 300,
          height: 300,
        }}
        source={require('@/src/assets/animations/LogoPocketPlanet.json')}
        autoPlay
        loop={!appReady}
        ref={animation}
        onAnimationFinish={finish}
      />
    </Animated.View>
  );
};
