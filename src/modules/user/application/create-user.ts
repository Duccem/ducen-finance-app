import uuid from 'react-native-uuid';
import { User } from '../domain/user';
import { UserAuth } from '../domain/user-auth';
import { UserRepository } from '../domain/user-repository';

export const useCreateUser = (userRepository: UserRepository) => {
  return {
    createUser: async (data: UserAuth, externalId: string) => {
      const user = new User(data.email, data.name, data.password, externalId, uuid.v4().toString());
      await userRepository.createUser(user);
    },
  };
};
