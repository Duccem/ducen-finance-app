import logo from '@/src/assets/images/icon.png';
import Button from '@/src/libs/ui/components/button';
import AppleIcon from '@/src/libs/ui/components/icons/apple';
import FacebookIcon from '@/src/libs/ui/components/icons/facebook';
import GoogleIcon from '@/src/libs/ui/components/icons/google';
import { Input } from '@/src/libs/ui/components/input';
import { Oauth } from '@/src/libs/ui/components/oauth';
import { useAuthStore } from '@/src/modules/user/infrastructure/auth-store';
import { SignUpForm } from '@/src/modules/user/infrastructure/forms/sign-up-form';
import { useSignUp } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpForm>>({
    resolver: zodResolver(SignUpForm),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const { setVerificationState, setUser } = useAuthStore();
  const { isLoaded, signUp } = useSignUp();
  const onSubmit = async (data: z.infer<typeof SignUpForm>) => {
    if (!isLoaded) return;
    console.log(data);
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        username: data.name,
        firstName: data.name,
        lastName: data.name,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setUser({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      setVerificationState('pending');
      router.push('/(auth)/confirm-code');
    } catch (error: any) {
      console.log(error.errors);
      Alert.alert('Error', error.errors[0].longMessage);
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
        <View className="flex flex-col flex-1 w-full px-5 mt-10 items-start justify-between">
          <View className="w-full my-8">
            <Text className="text-2xl font-NunitoBold text-foreground-primary mb-5">Register to get started</Text>
            <Controller
              name="name"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  type="password"
                />
              )}
            />
          </View>
          <View className="w-full pb-10">
            <Button
              title="Register"
              className="w-full rounded-3xl bg-foreground-primary h-12"
              onPress={handleSubmit(onSubmit, console.log)}
            />
            <View className="flex flex-row justify-center items-center my-3 gap-x-3">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="text-sm text-gray-500">Or Register with</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>
            <View className="relative flex flex-row w-full justify-center items-center gap-[10px]">
              <View className="absolute w-[250px] h-[25px] bg-foreground-primary top-[3px] right-[60px]"></View>
              <Oauth Icon={() => <GoogleIcon size={20} />} strategy="oauth_google" />
              <Oauth Icon={() => <FacebookIcon size={20} />} strategy="oauth_facebook" />
              <Oauth Icon={() => <AppleIcon size={20} />} strategy="oauth_apple" />
            </View>
            <Link href={'/(auth)/sign-in'} className="text-lg w-full text-center text-foreground-secondary mt-5">
              <Text className="text-foreground-secondary font-NunitoMedium mr-2">Already have an account? </Text>
              <Text className="text-brand-primary font-NunitoBold underline ml-3">Log In</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpPage;
