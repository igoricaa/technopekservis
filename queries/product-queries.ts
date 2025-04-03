import { Product, ProductCategory } from '@/gql/graphql';
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
      name
      ancestors {
        nodes {
          slug
          name
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

export interface GetProductsAndCategoriesByCategoryResponse {
  productCategory: {
    slug: string;
    name: string;
    products: {
      nodes: Product[];
    };
    ancestors: {
      nodes: ProductCategory[];
    };
  };
  productCategories: {
    edges: {
      node: ProductCategory;
    }[];
  };
}

export const getProductsAndCategoriesByCategoryQuery = gql`
  query getProductsAndCategoriesByCategory($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      slug
      name
      ancestors {
        nodes {
          slug
          name
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
    productCategories(where: { parent: 0 }, first: 100) {
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
                  parent {
                    node {
                      name
                      slug
                      parent {
                        node {
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
        }
      }
    }
  }
`;

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
          slug
          name
          children {
            nodes {
              slug
              name
              children {
                nodes {
                  slug
                  name
                  parent {
                    node {
                      name
                      slug
                      parent {
                        node {
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
        }
      }
    }
  }
`;
