import { ProductCategory } from '@/gql/graphql';
import {
  getProductBySlugQuery,
  getProductsAndCategoriesByCategoryQuery,
  GetProductsAndCategoriesByCategoryResponse,
} from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import CategoryShopPage from '@/components/shop/category-shop-page';
import { ProductData } from '@/utils/types';
import ProductPage from '@/components/product/product-page';
import {
  getCategoryHierarchySlugsAndNames,
  sortCategoriesByChildren,
} from '@/utils/utils';

export async function generateStaticParams() {
  return [];
}

// export async function generateStaticParams() {
//   const categoriesData = await fetchGraphQL<{
//     productCategories: {
//       edges: {
//         node: {
//           slug: string;
//           children: {
//             nodes: {
//               slug: string;
//             }[];
//           };
//         };
//       }[];
//     };
//   }>(print(getAllProductCategoriesQuery));

//   // Fetch all products
//   const productsData = await fetchGraphQL<{
//     products: {
//       nodes: {
//         slug: string;
//         productCategories: {
//           edges: {
//             isPrimary: boolean;
//             node: {
//               slug: string;
//               ancestors: {
//                 nodes: {
//                   slug: string;
//                 }[];
//               };
//             };
//           }[];
//         };
//       }[];
//     };
//   }>(print(getAllProductsQuery));

//   if (
//     !categoriesData?.productCategories?.edges ||
//     !productsData?.products?.nodes
//   ) {
//     return [];
//   }

//   const params: { categorySlug: string; slug?: string[] }[] = [];

//   // Add all top-level category routes
//   categoriesData.productCategories.edges.forEach(({ node }) => {
//     params.push({ categorySlug: node.slug });
//   });

//   // Add all product routes
//   productsData.products.nodes.forEach((product) => {
//     // Find the primary category for each product
//     const primaryCategory = product.productCategories.edges.find(
//       (edge) => edge.isPrimary
//     )?.node;

//     if (primaryCategory) {
//       const ancestorSlugs =
//         primaryCategory.ancestors?.nodes.map((ancestor) =>
//           ancestor.slug !== 'pekarska-oprema' ? ancestor.slug : null
//         ) || [];

//       const fullCategorySlug = [
//         ...ancestorSlugs.reverse(),
//         primaryCategory.slug,
//       ].join('/');

//       params.push({
//         categorySlug: fullCategorySlug,
//         slug: [product.slug],
//       });

//       // params.push({
//       //   categorySlug: fullCategorySlug,
//       //   slug: [product.slug],
//       // });
//     }
//   });

//   console.log('params:', params);

//   return params;
// }

interface PageProps {
  params: Promise<{
    categorySlug: string;
    slug: string[];
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { categorySlug, slug } = await params;

  // testna();

  if (!slug || slug.length === 0) {
    return <CategoryPage categorySlug={categorySlug} />;
  }

  if (slug.length === 2) {
    return <ProductPage categorySlug={categorySlug} productSlug={slug[1]} />;
  }

  const { product } = await fetchGraphQL<ProductData>(
    print(getProductBySlugQuery),
    { slug: slug[0] }
  );

  if (product) {
    return <ProductPage categorySlug={categorySlug} productSlug={slug[0]} />;
  }

  return <CategoryPage categorySlug={slug[0]} />;
};

const getProductsAndCategoriesByCategory = async (slug: string) => {
  const productsAndCategories =
    await fetchGraphQL<GetProductsAndCategoriesByCategoryResponse>(
      print(getProductsAndCategoriesByCategoryQuery),
      { slug }
    );

  return productsAndCategories;
};

const CategoryPage = async ({ categorySlug }: { categorySlug: string }) => {
  // TODO: remove edges
  // TODO: add pagination
  const productsAndCategories = await getProductsAndCategoriesByCategory(
    categorySlug
  );
  const products = productsAndCategories.productCategory?.products.nodes;
  const productCategories = productsAndCategories.productCategories.edges;
  const mainCategory = productCategories[0].node;
  const categoryName = productsAndCategories.productCategory?.name;

  const sortedCategories = sortCategoriesByChildren(
    mainCategory.children?.nodes || []
  );

  const { slugs, names } = getCategoryHierarchySlugsAndNames(
    productsAndCategories.productCategory as ProductCategory
  );

  const breadcrumbItems = [
    { label: 'Početna', href: '/' },
    ...slugs.map((slug, index) => ({
      label: names[index],
      href: `/${slugs.slice(0, index + 1).join('/')}`,
    })),
  ];

  return (
    <CategoryShopPage
      title={categoryName}
      products={products}
      categories={sortedCategories}
      breadcrumbItems={breadcrumbItems}
    />
  );
};

export default Page;

// async function testna() {
//   const categoriesData = await fetchGraphQL<{
//     productCategories: {
//       edges: {
//         node: {
//           slug: string;
//           children: {
//             nodes: {
//               slug: string;
//             }[];
//           };
//         };
//       }[];
//     };
//   }>(print(getAllProductCategoriesQuery));

//   // Fetch all products
//   const productsData = await fetchGraphQL<{
//     products: {
//       nodes: {
//         slug: string;
//         productCategories: {
//           edges: {
//             isPrimary: boolean;
//             node: {
//               slug: string;
//               ancestors: {
//                 nodes: {
//                   slug: string;
//                 }[];
//               };
//             };
//           }[];
//         };
//       }[];
//     };
//   }>(print(getAllProductsQuery));

//   if (
//     !categoriesData?.productCategories?.edges ||
//     !productsData?.products?.nodes
//   ) {
//     return [];
//   }

//   const params: { categorySlug: string; slug?: string[] }[] = [];

//   // Add all top-level category routes
//   categoriesData.productCategories.edges.forEach(({ node }) => {
//     params.push({ categorySlug: node.slug });
//   });

//   // Add all product routes
//   productsData.products.nodes.forEach((product) => {
//     // Find the primary category for each product
//     const primaryCategory = product.productCategories.edges.find(
//       (edge) => edge.isPrimary
//     )?.node;

//     if (primaryCategory) {
//       const ancestorSlugs =
//         primaryCategory.ancestors?.nodes.map((ancestor) =>
//           ancestor.slug !== 'pekarska-oprema' ? ancestor.slug : null
//         ) || [];

//       const fullCategorySlug = [
//         ...ancestorSlugs.reverse(),
//         primaryCategory.slug,
//       ].join('/');

//       params.push({
//         categorySlug: fullCategorySlug,
//         slug: [product.slug],
//       });

//       // params.push({
//       //   categorySlug: fullCategorySlug,
//       //   slug: [product.slug],
//       // });
//     }
//   });

//   console.log('params:', params);

//   return params;
// }
