import CategoryShopPage from '@/components/shop/category-shop-page';
import { ProductCategory } from '@/gql/graphql';
import {
  getProductsAndCategoriesQuery,
  GetProductsAndCategoriesResponse,
} from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import {
  getCategoryHierarchySlugsAndNames,
  sortCategoriesByChildren,
} from '@/utils/utils';
import { print } from 'graphql';

const getProductsAndCategories = async () => {
  const productsAndCategories =
    await fetchGraphQL<GetProductsAndCategoriesResponse>(
      print(getProductsAndCategoriesQuery)
    );

  return productsAndCategories;
};

const ShopPage = async () => {
  // TODO: remove edges
  // TODO: add pagination
  const productsAndCategories = await getProductsAndCategories();
  const products = productsAndCategories.products.nodes;
  const productCategories = productsAndCategories.productCategories.edges;
  const mainCategory = productCategories[0].node;

  const sortedCategories = sortCategoriesByChildren(
    mainCategory.children?.nodes || []
  );

  const breadcrumbItems = [
    { label: 'Početna', href: '/' },
    { label: 'Pekarska oprema', href: '/pekarska-oprema' },
  ];

  return (
    <CategoryShopPage
      title='Pekarska oprema'
      products={products}
      categories={sortedCategories}
      breadcrumbItems={breadcrumbItems}
    />
  );
};

export default ShopPage;
