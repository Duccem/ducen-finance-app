import { tokenCache } from '@/src/modules/auth/infrastructure/clerk/token';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import 'react-native-reanimated';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
NavigationBar.setVisibilityAsync('hidden');
LogBox.ignoreLogs(['Clerk:']);

export default function RootLayout() {
  const [loaded] = useFonts({
    Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
    NunitoSemiBold: require('../assets/fonts/Nunito-SemiBold.ttf'),
    NunitoExtraBold: require('../assets/fonts/Nunito-ExtraBold.ttf'),
    NunitoLight: require('../assets/fonts/Nunito-Light.ttf'),
    NunitoMedium: require('../assets/fonts/Nunito-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar backgroundColor="transparent" />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
