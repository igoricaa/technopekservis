import { Product } from '@/gql/graphql';
import { print } from 'graphql';
import { cn } from '@/lib/utils';
import { getAllProductsQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Suspense } from 'react';

const getProducts = async () => {
  const productsData = await fetchGraphQL<{ products: { nodes: Product[] } }>(
    print(getAllProductsQuery)
  );

  if (!productsData?.products?.nodes) {
    return [];
  }

  return productsData.products.nodes;
};

const ProductGridSection = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4',
        className
      )}
    >
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
};

export default ProductGridSection;

const ProductGrid = async () => {
  const products: Product[] = await getProducts();

  if (!products || products.length === 0) {
    return <section>No products found</section>;
  }

  return products.map((product: Product) => (
    <ProductCard key={product.databaseId} product={product} />
  ));
};

const ProductGridSkeleton = () => {
  return [...Array(12)].map((_, index) => (
    <article
      key={index}
      className='col-span-2 lg:col-span-3 group px-4 py-6 shadow-xl animate-pulse'
    >
      <div className='relative w-full aspect-square overflow-hidden bg-gray-200' />
      <div className='h-4 w-24 bg-gray-200 rounded mt-4' />
      <div className='h-8 w-3/4 bg-gray-200 rounded mt-2' />
      <div className='h-6 w-32 bg-gray-200 rounded mt-4' />
    </article>
  ));
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article
      key={product.databaseId}
      className='col-span-2 lg:col-span-3 group px-4 py-6 shadow-xl'
      role='article'
      aria-label={`Product: ${product.title}`}
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View details for ${product.title}`}
      >
        <div className='relative w-full aspect-square overflow-hidden'>
          <Image
            src={product.featuredImage?.node?.sourceUrl || ''}
            alt={product.title || 'Product image'}
            fill
            sizes='25vw'
            className='object-cover group-hover:scale-110 transition-all duration-300'
            priority={false}
          />
        </div>
        {product.productCategories?.nodes[0]?.name && (
          <p className='uppercase text-gray-500'>
            {product.productCategories.nodes[0].name}
          </p>
        )}
        <h3 className='text-4xl font-bold'>{product.title}</h3>
        <Button
          variant='textual'
          className='text-accent mt-1 group-hover:after:translate-x-0 group-hover:after:delay-300 group-hover:before:translate-x-full group-hover:before:delay-0'
          aria-label={`Saznaj više o ${product.title}`}
        >
          Saznajte više
        </Button>
      </Link>
    </article>
  );
};
