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

export const getProductsQuery = gql`
  query getProducts($limit: Int) {
    products(first: $limit) {
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

export interface ProductCategory {
  slug: string;
  name: string;
}

export interface ProductAncestor {
  slug: string;
}

export interface ProductCategoryEdge {
  isPrimary: boolean;
  node: {
    slug: string;
    name: string;
    ancestors: {
      nodes: ProductAncestor[];
    };
  };
}

export interface ProductAttribute {
  slug: string;
  name: string;
}

export interface ProductDetails {
  advantages: string[];
  characteristics: string[];
  pdf: {
    node: {
      uri: string;
    };
  };
}

export interface Product {
  slug: string;
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  productDetails: ProductDetails;
  productAttributes: {
    nodes: ProductAttribute[];
  };
  productCategories: {
    edges: ProductCategoryEdge[];
  };
}

export interface GetProductsAndCategoriesResponse {
  products: {
    nodes: Product[];
  };
  productCategories: {
    edges: {
      node: ProductCategory;
    }[];
  };
}

export const getProductsAndCategoriesQuery = gql`
  query getProductsAndCategories {
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
    productCategories(where: { parent: 0 }) {
      edges {
        node {
          children {
            nodes {
              slug
              name
              children {
                nodes {
                  slug
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

// productCategories {
//   edges {
//     node {
//       slug
//       name
//       parent {
//         node {
//           name
//           slug
//           parent {
//             node {
//               name
//               slug
//             }
//           }
//         }
//       }
//     }
//   }
// }
