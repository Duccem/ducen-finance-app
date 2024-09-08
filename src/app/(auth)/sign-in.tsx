import logo from '@/src/assets/images/icon.png';
import Button from '@/src/libs/ui/components/button';
import AppleIcon from '@/src/libs/ui/components/icons/apple';
import FacebookIcon from '@/src/libs/ui/components/icons/facebook';
import GoogleIcon from '@/src/libs/ui/components/icons/google';
import { Input } from '@/src/libs/ui/components/input';
import { Link } from 'expo-router';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInPage = () => {
  return (
    <ScrollView
      className="bg-background-secondary flex-1 h-screen"
      style={{ height: Dimensions.get('screen').height }}
    >
      <SafeAreaView
        className="flex-1 flex flex-col justify-start items-center h-full"
        style={{ height: Dimensions.get('screen').height }}
      >
        <View className="h-24 w-24 rounded-full bg-background-third flex justify-center items-center pl-2 mt-6">
          <Image source={logo} className="w-16 h-16" resizeMode="center" />
        </View>
        <View className="flex flex-col w-full px-5 mt-10 items-start justify-between  flex-1">
          <View className="w-full my-8">
            <Text className="text-2xl font-NunitoBold text-foreground-primary MB-5">
              Welcome back! 👋
            </Text>
            <Input placeholder="Mail" />
            <Input placeholder="Password" type="password" />
          </View>
          <View className="w-full pb-10">
            <Button
              title="Login"
              className="w-full rounded-3xl bg-foreground-primary h-12"
            />
            <View className="flex flex-row justify-center items-center my-3 gap-x-3">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="text-sm text-gray-500">Or login with</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>
            <View className="relative flex flex-row w-full justify-center items-center gap-[10px]">
              <View className="absolute w-[250px] h-[25px] bg-foreground-primary top-[12px] right-[50px]"></View>
              <Button
                variant={'outline'}
                size={'lg'}
                Left={() => <GoogleIcon size={20} />}
                className=" rounded-3xl h-12"
                activeOpacity={1}
              />
              <Button
                variant={'outline'}
                size={'lg'}
                Left={() => <FacebookIcon size={20} />}
                className=" rounded-3xl h-12"
                activeOpacity={1}
              />
              <Button
                variant={'outline'}
                size={'lg'}
                Left={() => <AppleIcon size={20} />}
                className=" rounded-3xl h-12"
                activeOpacity={1}
              />
            </View>
            <Link
              href={'/(auth)/sign-up'}
              className="text-lg w-full text-center text-foreground-secondary mt-5"
            >
              <Text className="text-foreground-secondary font-NunitoMedium mr-2">
                Don`t have an account?{' '}
              </Text>
              <Text className="text-brand-primary font-NunitoBold underline ml-3">
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignInPage;
