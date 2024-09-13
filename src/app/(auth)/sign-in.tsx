import logo from '@/src/assets/images/icon.png';
import Button from '@/src/libs/ui/components/button';
import AppleIcon from '@/src/libs/ui/components/icons/apple';
import FacebookIcon from '@/src/libs/ui/components/icons/facebook';
import GoogleIcon from '@/src/libs/ui/components/icons/google';
import { Input } from '@/src/libs/ui/components/input';
import { Oauth } from '@/src/libs/ui/components/oauth';
import { LogInForm } from '@/src/modules/user/infrastructure/forms/log-in-form';
import { useSignIn } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const SignInPage = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof LogInForm>>({
    resolver: zodResolver(LogInForm),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { signIn, setActive, isLoaded } = useSignIn();
  const onSubmit = async (data: z.infer<typeof LogInForm>) => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push('/(root)/(tabs)/home');
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView className="bg-background-secondary flex-1 h-screen" style={{ height: Dimensions.get('screen').height }}>
      <SafeAreaView
        className="flex-1 flex flex-col justify-start items-center h-full"
        style={{ height: Dimensions.get('screen').height }}
      >
        <View className="h-24 w-24 rounded-full bg-background-third flex justify-center items-center pl-2 mt-6">
          <Image source={logo} className="w-16 h-16" resizeMode="center" />
        </View>
        <View className="flex flex-col w-full px-5 mt-10 items-start justify-between  flex-1">
          <View className="w-full my-8">
            <Text className="text-2xl font-NunitoBold text-foreground-primary MB-5">Welcome back! 👋</Text>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input placeholder="Email" value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input placeholder="Password" value={value} onChangeText={onChange} onBlur={onBlur} type="password" />
              )}
            />
          </View>
          <View className="w-full pb-10">
            <Button
              title="Login"
              className="w-full rounded-3xl bg-foreground-primary h-12"
              onPress={handleSubmit(onSubmit, console.log)}
            />
            <View className="flex flex-row justify-center items-center my-3 gap-x-3">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="text-sm text-gray-500">Or login with</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>
            <View className="relative flex flex-row w-full justify-center items-center gap-[10px]">
              <View className="absolute w-[250px] h-[25px] bg-foreground-primary top-[3px] right-[60px]"></View>
              <Oauth Icon={() => <GoogleIcon size={20} />} strategy="oauth_google" />
              <Oauth Icon={() => <FacebookIcon size={20} />} strategy="oauth_facebook" />
              <Oauth Icon={() => <AppleIcon size={20} />} strategy="oauth_apple" />
            </View>
            <Link href={'/(auth)/sign-up'} className="text-lg w-full text-center text-foreground-secondary mt-5">
              <Text className="text-foreground-secondary font-NunitoMedium mr-2">Don`t have an account? </Text>
              <Text className="text-brand-primary font-NunitoBold underline ml-3">Sign Up</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignInPage;
