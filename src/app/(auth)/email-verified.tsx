import Button from '@/src/libs/ui/components/button';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmailVerified = () => {
  return (
    <ScrollView className="bg-background-primary flex-1 h-screen" style={{ height: Dimensions.get('screen').height }}>
      <SafeAreaView
        className="flex-1 flex flex-col justify-start items-center h-full relative"
        style={{ height: Dimensions.get('screen').height }}
      >
        <View className="mt-[50px] w-full px-5">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/sign-up')}
            className="w-10 h-10 flex justify-center items-center bg-background-third rounded-2xl"
          >
            <ArrowLeft className="text-foreground-primary" size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <LottieView
            source={require('@/src/assets/animations/success.json')}
            autoPlay
            loop={false}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View className="px-5">
          <Text className="text-2xl font-NunitoBold text-foreground-primary text-center">
            Your email has been verified
          </Text>
          <Text className="text-md font-Nunito text-foreground-secondary text-center">
            Now you can login to your account and start using the app. Enjoy!
          </Text>
        </View>
        <View className="w-full px-5 mt-auto mb-[50px]">
          <Button
            title="Continue"
            className="w-full rounded-3xl bg-foreground-primary h-12"
            onPress={() => {
              router.push('/(root)/(tabs)/home');
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EmailVerified;
