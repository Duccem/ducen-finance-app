import uuid from 'react-native-uuid';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

export const useCreateUser = (userRepository: UserRepository) => {
  return {
    createUser: async (data: { email: string; name: string; externalId: string }) => {
      const user = new User(data.email, data.name, data.externalId, uuid.v4().toString());
      await userRepository.createUser(user);
    },
  };
};
