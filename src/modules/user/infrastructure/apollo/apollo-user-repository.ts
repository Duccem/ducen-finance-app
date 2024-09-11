import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user-repository';
import { SIGN_UP_MUTATION } from './sing-up-mutation';

export const useApolloUserRepository = ({
  client,
}: {
  client?: ApolloClient<NormalizedCacheObject>;
}): UserRepository => {
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
