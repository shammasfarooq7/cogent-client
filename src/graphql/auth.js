import { gql } from '@apollo/client';
// mutation signin($loginUserInput: LoginUserInput!) {
//   signin(loginUserInput: $loginUserInput) {
//     accessToken
//   }
// }
export const SIGN_UP = gql`
  mutation SignUp($createUserInput: CreateUserInput!) {
    signup(createUserInput: $createUserInput) {
      id
      email
      phoneNumber
      createdAt
      updatedAt
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($loginUserInput: LoginUserInput!) {
    signin(loginUserInput: $loginUserInput) {
      accessToken
    }
  }
`;

