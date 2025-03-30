import gql from 'graphql-tag';

export const getAllProductCategoriesQuery = gql`
  query getAllProductCategories {
    productCategories {
      edges {
        node {
          slug
          name
          parent {
            node {
              name
              slug
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
      slug
      name
      parent {
        node {
          slug
          name
        }
      }
    }
  }
`;
