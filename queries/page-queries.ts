import gql from 'graphql-tag';

export const getPageByIdQuery = gql`
  query getPageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      content
    }
  }
`;
