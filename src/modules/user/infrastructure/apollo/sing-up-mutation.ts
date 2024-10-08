import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    createUser(input: $input)
  }
`;
