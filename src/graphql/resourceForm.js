import { gql } from '@apollo/client';

export const RESOURCE_FORM = gql`
mutation CreateResource($createResourceInput: CreateResourceInput!) {
    createResource(createResourceInput: $createResourceInput) {
      message
    }

  }
`;