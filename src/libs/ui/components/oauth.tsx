import { useCreateUser } from '@/src/modules/user/application/create-user';
import { useApolloUserRepository } from '@/src/modules/user/infrastructure/apollo/apollo-user-repository';
import { useOAuth } from '@clerk/clerk-expo';
import type { OAuthStrategy } from '@clerk/types';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import Button from './button';

export const Oauth = ({ strategy, Icon }: { strategy: OAuthStrategy; Icon: React.ComponentType<any> }) => {
  const { startOAuthFlow } = useOAuth({ strategy });
  const userRepository = useApolloUserRepository();
  const { createUser } = useCreateUser(userRepository);
  const onOauthPress = async () => {
    try {
      const { createdSessionId, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(root)/(tabs)/home', {
          scheme: 'exp://127.0.0.1:8081',
        }),
      });
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        if (signUp?.createdUserId) {
          await createUser({
            email: signUp.emailAddress || '',
            name: signUp.firstName || '',
            externalId: signUp.createdUserId,
          });
        }
        router.replace('/(root)/(tabs)/home');
      }
    } catch (error: any) {
      if (error.code === 'session_exists') {
        router.replace('/(root)/(tabs)/home');
        return;
      }
      Alert.alert('Error', 'An error occurred while trying to sign in with Google');
    }
  };
  return (
    <Button
      variant={'outline'}
      size={'lg'}
      Left={Icon}
      className=" rounded-3xl h-12 w-1/4"
      activeOpacity={1}
      onPress={onOauthPress}
    />
  );
};
