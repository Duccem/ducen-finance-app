import { useApolloClient } from '@apollo/client';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user-repository';
import { SIGN_UP_MUTATION } from './sing-up-mutation';

export const useApolloUserRepository = (): UserRepository => {
  const client = useApolloClient();
  return {
    async createUser(user: User) {
      await client!.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: {
          input: user.toPrimitives(),
        },
      });
    },
  };
};
