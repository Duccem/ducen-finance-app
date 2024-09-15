import logo from '@/src/assets/images/icon.png';
import Button from '@/src/libs/ui/components/button';
import { Input } from '@/src/libs/ui/components/input';
import { useSignIn } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const { isLoaded, signIn } = useSignIn();
  const send = async () => {
    if (!isLoaded) return;

    try {
      await signIn.create({ strategy: 'reset_password_email_code', identifier: email });
      router.push('/(auth)/recovery-code');
    } catch (error: any) {
      console.log(error.errors[0].longMessage);
      Alert.alert('Error', 'An error occurred while sending the code. Please try again later.');
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
            onPress={() => router.push('/(auth)/sign-in')}
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
            <Text className="text-2xl font-NunitoBold text-foreground-primary mb-5">Forgot password?</Text>
            <Text className="text-md font-NunitoSemiBold text-foreground-third">
              Don`t worry it occurs. Please enter the email address linked with your account.
            </Text>
            <Input placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
          </View>
          <View className="w-full pb-10">
            <Button onPress={send} title="Send code" className="w-full rounded-3xl bg-foreground-primary h-12" />
            <TouchableWithoutFeedback>
              <Text className="text-center text-lg mt-2">
                <Text className="text-foreground-secondary font-NunitoMedium mr-2">Remember password? </Text>
                <Text className="text-brand-primary font-NunitoBold underline ml-3">Log In</Text>
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ForgotPassword;
