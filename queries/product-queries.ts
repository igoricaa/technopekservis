import gql from 'graphql-tag';

export const getAllProductsQuery = gql`
  query getAllProducts {
    products {
      nodes {
        databaseId
        slug
        uri
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        productDetails {
          advantages
          characteristics
          pdf {
            node {
              uri
            }
          }
        }
        productCategories {
          nodes {
            databaseId
            slug
            name
            uri
          }
        }
        productAttributes {
          nodes {
            databaseId
            slug
            name
            uri
          }
        }
      }
    }
  }
`;

export const getProductBySlugQuery = gql`
  query getProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      slug
      title
      productDetails {
        advantages
        characteristics
        pdf {
          node {
            uri
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      productCategories {
        nodes {
          databaseId
          slug
          name
          uri
        }
      }
      productAttributes {
        nodes {
          databaseId
          slug
          name
          uri
        }
      }
    }
  }
`;
