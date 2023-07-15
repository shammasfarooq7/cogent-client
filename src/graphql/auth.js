import { gql } from '@apollo/client';
// mutation signin($loginUserInput: LoginUserInput!) {
//   signin(loginUserInput: $loginUserInput) {
//     accessToken
//   }
// }
export const SIGN_UP = gql`
  mutation SignUp($signUpUserInput: SignUpUserInput!) {
    signup(signUpUserInput: $signUpUserInput) {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($loginUserInput: LoginUserInput!) {
    signin(loginUserInput: $loginUserInput) {
      accessToken
      roles
    }
  }
`;

export const GET_CURRENT_USER = gql`
query getCurrentUserQuery {
  getCurrentUser {
    email
    firstName
    lastName
    middleName
    email
    roles {
      role
    }
    customer{
      id
      name
    }
  }
}
`;