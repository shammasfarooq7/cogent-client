/*
  1. Creating connection with GraphQL
  2. Handling and showing GraphQL and network errors.
*/

// packages block
import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, from } from "@apollo/client";
// components block
import { Alert } from "../components/common/Alert";
// utils and constants block
import { handleLogout } from "../utils";
import {
  INVALID_OR_EXPIRED_TOKEN_MESSAGE, NOT_FOUND_EXCEPTION, PRECONDITION_FAILED_EXCEPTION, REQUEST_NOT_FOUND, AUTH_TOKEN, TOKEN_INVALID,
  TOKEN_NOT_FOUND, UNAUTHORIZED, CONFLICT_EXCEPTION
} from "../constants";

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_BASE_URL}/graphql`
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(
      ({ extensions }) => {
        if (extensions) {
          const { exception } = extensions;

          if (exception) {
            const { response } = exception

            if (response) {
              const { error, response: errorResponse } = response

              if (error && error !== REQUEST_NOT_FOUND && error !== NOT_FOUND_EXCEPTION && error !== CONFLICT_EXCEPTION) {
                if (error === TOKEN_NOT_FOUND) {
                  Alert.error(INVALID_OR_EXPIRED_TOKEN_MESSAGE)
                } else
                  Alert.error(error)
              }

              if (errorResponse) {
                const { error: responseError, message } = errorResponse;

                if (message && message !== REQUEST_NOT_FOUND && message !== NOT_FOUND_EXCEPTION && message !== CONFLICT_EXCEPTION) {
                  Alert.error(message)
                } else if (responseError && responseError !== REQUEST_NOT_FOUND && responseError !== NOT_FOUND_EXCEPTION && responseError !== CONFLICT_EXCEPTION && responseError === PRECONDITION_FAILED_EXCEPTION) {
                  Alert.error(responseError)
                }
              }
            }
          }
        }

        return null
      }
    );

    const [{ message }] = graphQLErrors;

    if (message === UNAUTHORIZED || message === TOKEN_INVALID) handleLogout();
    else if (message) Alert.error(message)
  }

  if (networkError) Alert.error(networkError.message);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: from([authMiddleware, errorLink, httpLink]),
});

export default client;
