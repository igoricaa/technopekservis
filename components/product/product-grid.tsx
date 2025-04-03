import { Product, ProductCategory } from '@/gql/graphql';
import { print } from 'graphql';
import { getProductsQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { getCategoryHierarchySlugsAndNames } from '@/utils/utils';
import { ProductCard } from './product-card';

const getProducts = async (numberOfProducts?: number) => {
  const productsData = await fetchGraphQL<{ products: { nodes: Product[] } }>(
    print(getProductsQuery),
    {
      limit: numberOfProducts,
    }
  );

  if (
    !productsData?.products?.nodes ||
    productsData.products.nodes.length === 0
  ) {
    return [];
  }

  return productsData.products.nodes;
};

export const ProductGridSection = async ({
  numberOfProducts,
  className,
}: {
  numberOfProducts?: number;
  className?: string;
}) => {
  const products = await getProducts(numberOfProducts);

  return (
    <section className={className}>
      <ProductGrid products={products} numberOfProducts={numberOfProducts} />
    </section>
  );
};

export const ProductGrid = ({
  numberOfProducts,
  products,
}: {
  products: Product[];
  numberOfProducts?: number;
}) => {
  if (!products || products.length === 0) {
    return <section>Nema traženih proizvoda</section>;
  }

  const colSpan = Math.min(Math.floor(12 / (numberOfProducts || 4)), 6);
  const colSpanClass =
    {
      1: '!col-span-1',
      2: '!col-span-2',
      3: '!col-span-3',
      4: '!col-span-4',
      5: '!col-span-5',
      6: '!col-span-6',
    }[colSpan] || '!col-span-4';

  return products.map((product: Product) => {
    const primaryCategory = product.productCategories?.edges.find(
      (category: any) => category.isPrimary
    )?.node as ProductCategory;

    const { slugs } = getCategoryHierarchySlugsAndNames(primaryCategory);

    const categoryHierarchyPath = [...slugs].join('/');

    const productLink = `/${categoryHierarchyPath}/${product.slug}`;

    return (
      <ProductCard
        key={product.slug}
        productTitle={product.title || ''}
        productImage={product.featuredImage?.node?.sourceUrl || ''}
        primaryCategory={primaryCategory.name || ''}
        productLink={productLink}
        className={colSpanClass}
      />
    );
  });
};
