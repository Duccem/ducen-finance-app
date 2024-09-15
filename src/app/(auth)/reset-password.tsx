import logo from '@/src/assets/images/icon.png';
import Button from '@/src/libs/ui/components/button';
import { Input } from '@/src/libs/ui/components/input';
import { useAuthStore } from '@/src/modules/user/infrastructure/auth-store';
import { ResetPasswordForm } from '@/src/modules/user/infrastructure/forms/reset-password-form';
import { useSignIn } from '@clerk/clerk-expo';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const ResetPassword = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof ResetPasswordForm>>({
    resolver: zodResolver(ResetPasswordForm),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const { signIn, isLoaded, setActive } = useSignIn();
  const { recoveryCode } = useAuthStore();
  const onSubmit = async (data: z.infer<typeof ResetPasswordForm>) => {
    if (!isLoaded) return;
    if (data.password !== data.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const recoveryAttempt = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: recoveryCode,
        password: data.password,
      });
      if (recoveryAttempt.status === 'complete') {
        await setActive({ session: recoveryAttempt.createdSessionId });
        router.push('/(auth)/success-password');
      } else {
        Alert.alert('Error', 'Invalid recovery code');
      }
    } catch (error: any) {
      Alert.alert('Error', error.errors[0].longMessage);
      console.log(error.errors[0].longMessage);
    }
  };
  return (
    <ScrollView className="bg-background-secondary flex-1 h-screen" style={{ height: Dimensions.get('screen').height }}>
      <SafeAreaView
        className="flex-1 flex flex-col justify-start items-center h-full"
        style={{ height: Dimensions.get('screen').height }}
      >
        <View className="mt-[65px] w-full px-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 flex justify-center items-center bg-background-third rounded-2xl"
          >
            <ArrowLeft className="text-foreground-primary" size={20} />
          </TouchableOpacity>
        </View>
        <View className="h-24 w-24 rounded-full bg-background-third flex justify-center items-center pl-2 mt-6">
          <Image source={logo} className="w-16 h-16" resizeMode="center" />
        </View>
        <View className="flex flex-col w-full px-5 mt-10 items-start justify-between  flex-1">
          <View className="w-full my-8">
            <Text className="text-2xl font-NunitoBold text-foreground-primary MB-5">Create a new password</Text>
            <Text className="text-md font-NunitoSemiBold text-foreground-third">
              Your new password must be unique from those you have previously used.
            </Text>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input placeholder="Email" value={value} onChangeText={onChange} onBlur={onBlur} type="password" />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input placeholder="Password" value={value} onChangeText={onChange} onBlur={onBlur} type="password" />
              )}
            />
          </View>
          <View className="w-full pb-10">
            <Button
              title="Reset password"
              className="w-full rounded-3xl bg-foreground-primary h-12"
              onPress={handleSubmit(onSubmit, console.log)}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ResetPassword;
