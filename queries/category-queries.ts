import gql from 'graphql-tag';

export const getAllProductCategoriesQuery = gql`
  query getAllProductCategories {
    productCategories {
      edges {
        node {
          databaseId
          slug
          name
          uri
          count
          parent {
            node {
              databaseId
              name
              slug
              uri
            }
          }
        }
      }
    }
  }
`;

export const getProductCategoryBySlugQuery = gql`
  query getProductCategoryBySlug($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      databaseId
      slug
      name
      uri
      count
      parent {
        node {
          databaseId
          slug
          name
          uri
        }
      }
    }
  }
`;
