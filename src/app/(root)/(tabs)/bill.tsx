import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const Bill = () => {
  const { signOut } = useAuth();
  return (
    <View className="flex flex-1 flex-col justify-center items-center">
      <TouchableOpacity
        onPress={() => {
          signOut();
          router.push('/(auth)/sign-in');
        }}
      >
        <Text>Out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Bill;
