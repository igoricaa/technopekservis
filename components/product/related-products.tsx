import { getProductsByCategoryQuery } from '@/queries/product-queries';
import { ProductCard, ProductCardSkeleton } from './product-card';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import { Product } from '@/gql/graphql';

interface CategoryData {
  productCategory: {
    name: string;
    slug: string;
    ancestors: { nodes: { slug: string }[] };
    products: { nodes: Product[] };
  };
}

export const RelatedProducts = async ({
  categorySlug,
  productSlug,
  categoryHierarchy,
}: {
  categorySlug: string;
  productSlug: string;
  categoryHierarchy: string;
}) => {
  const { productCategory } = await fetchGraphQL<CategoryData>(
    print(getProductsByCategoryQuery),
    { slug: categorySlug }
  );

  // const colSpan = Math.min(
  //   Math.floor(12 / (productCategory.products.nodes.length - 1)),
  //   6
  // );

  // const colSpanClass =
  //   {
  //     1: '!col-span-1',
  //     2: '!col-span-2',
  //     3: '!col-span-3',
  //     4: '!col-span-4',
  //     5: '!col-span-5',
  //     6: '!col-span-6',
  //   }[colSpan] || '!col-span-4';

  const relatedProducts = productCategory.products.nodes
    .filter((product) => product.slug !== productSlug)
    .map((product) => (
      <ProductCard
        key={product.slug}
        productTitle={product.title || ''}
        productImage={product.featuredImage?.node?.sourceUrl || ''}
        primaryCategory={productCategory.name}
        productLink={`/${categoryHierarchy}/${product.slug}`}
        className={'lg:!col-span-3'}
      />
    ));

  if (relatedProducts.length === 0) return null;

  return (
    <section className='mt-32'>
      <h4 className='text-5xl font-bold mb-4'>Slični proizvodi</h4>
      <div className='grid grid-cols-12 gap-4'>{relatedProducts}</div>{' '}
    </section>
  );
};

export const RelatedProductsSkeleton = () => (
  <section className='mt-32'>
    <h4 className='text-5xl font-bold mb-4'>Slični proizvodi</h4>
    <div className='grid grid-cols-12 gap-4'>
      {[...Array(4)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </section>
);
