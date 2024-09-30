import logo from '@/src/assets/images/icon.png';
import Button from '@/src/libs/ui/components/button';
import { Input } from '@/src/libs/ui/components/input';
import { useCreateUser } from '@/src/modules/user/application/create-user';
import { useApolloUserRepository } from '@/src/modules/user/infrastructure/apollo/apollo-user-repository';
import { useAuthStore } from '@/src/modules/user/infrastructure/auth-store';
import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const ConfirmCode = () => {
  const { verification, setVerificationState, setErrorMessage, setVerificationCode, user } = useAuthStore();
  const { isLoaded, signUp, setActive } = useSignUp();
  const userRepository = useApolloUserRepository();
  const { createUser } = useCreateUser(userRepository);
  const onVerify = async () => {
    if (!isLoaded) return;
    try {
      console.log(verification.code);
      const completedSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completedSignUp.status === 'complete') {
        await setActive({ session: completedSignUp.createdSessionId });
        await createUser({
          email: user.email,
          name: user.name,
          externalId: completedSignUp.createdUserId || '',
        });
        setVerificationState('success');
        router.push('/(auth)/email-verified');
      } else {
        setVerificationState('error');
        Alert.alert('Error', 'Invalid code');
      }
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setVerificationState('error');
      setErrorMessage(error.errors[0].longMessage);
      Alert.alert('Error', error.errors[0].longMessage);
    }
  };
  return (
    <ScrollView className="bg-background-primary flex-1 h-screen" style={{ height: Dimensions.get('screen').height }}>
      <SafeAreaView
        className="flex-1 flex flex-col justify-start items-center h-full"
        style={{ height: Dimensions.get('screen').height }}
      >
        <View className="mt-[65px] w-full px-5">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/sign-up')}
            className="w-10 h-10 flex justify-center items-center bg-background-third rounded-2xl"
          >
            <ArrowLeft className="text-foreground-primary" size={20} />
          </TouchableOpacity>
        </View>
        <View className="h-24 w-24 rounded-full bg-background-third flex justify-center items-center pl-2 mt-6">
          <Image source={logo} className="w-16 h-16" resizeMode="center" />
        </View>
        <View className="flex flex-col flex-1 w-full px-5 mt-10 items-start justify-between">
          <View className="w-full my-8">
            <Text className="text-2xl font-NunitoBold text-foreground-primary mb-5">OTP Verification</Text>
            <Text className="text-md font-NunitoSemiBold text-foreground-third">
              Enter the verification code we just sent to your email address
            </Text>
            <Input value={verification.code} onChangeText={(text) => setVerificationCode(text)} placeholder="Code" />
          </View>
          <View className="w-full pb-10">
            <Button title="Verify" className="w-full rounded-3xl bg-foreground-primary h-12" onPress={onVerify} />
            <TouchableWithoutFeedback>
              <Text className="text-center text-lg mt-2">
                <Text className="text-foreground-secondary font-NunitoMedium mr-2">Didn`t receive code? </Text>
                <Text className="text-brand-primary font-NunitoBold underline ml-3">Resend</Text>
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ConfirmCode;
