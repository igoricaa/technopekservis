import gql from 'graphql-tag';

export const getPostByIdQuery = gql`
  query getPostById($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      content
      date
      title
      author {
        node {
          name
        }
      }
    }
  }
`;

export const getAllPostsQuery = gql`
  query getAllPosts {
    posts {
      nodes {
        slug
        title
        date
        content
      }
    }
  }
`;
