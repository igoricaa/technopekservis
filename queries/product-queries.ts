import gql from 'graphql-tag';

export const getAllProductsQuery = gql`
  query getAllProducts {
    products {
      nodes {
        slug
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
        productAttributes {
          nodes {
            slug
            name
          }
        }
        productCategories {
          edges {
            isPrimary
            node {
              slug
              name
              ancestors {
                nodes {
                  slug
                }
              }
            }
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
        edges {
          isPrimary
          node {
            slug
            name
            ancestors {
              nodes {
                slug
                name
              }
            }
          }
        }
      }
      productAttributes {
        nodes {
          slug
          name
        }
      }
    }
  }
`;

export const getProductsByCategoryQuery = gql`
  query getProductsByCategory($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      slug
      ancestors {
        nodes {
          slug
        }
      }
      products {
        nodes {
          slug
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;
