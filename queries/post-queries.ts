import gql from 'graphql-tag';

export const getPostBySlugQuery = gql`
  query getPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      content
      date
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

export const getAdjacentPostsQuery = gql`
  query getAdjacentPosts($date: String = "", $notIn: [ID] = []) {
    previous: posts(
      first: 1
      where: { orderby: { field: DATE, order: ASC }, notIn: $notIn }
      before: $date
    ) {
      nodes {
        slug
        title
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
    next: posts(
      first: 1
      where: { orderby: { field: DATE, order: DESC }, notIn: $notIn }
      after: $date
    ) {
      nodes {
        slug
        title
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
  }
`;

export const getAllPostsQuery = gql`
  query getAllPosts {
    posts(first: 100) {
      nodes {
        slug
        title
        excerpt
        uri
        link
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;
