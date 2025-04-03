import gql from 'graphql-tag';

export const ContentInfoQuery = gql`
  query ContentInfo($slug: ID!) {
    contentNode(id: $slug, idType: URI) {
      contentTypeName
      databaseId
      status
      uri
    }
  }
`;

export const AllContentInfoQuery = gql`
  query AllContentInfo {
    contentNodes(first: 100) {
      nodes {
        slug
        uri
        contentTypeName
      }
    }
  }
`;
