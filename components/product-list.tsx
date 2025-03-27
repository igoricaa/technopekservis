// 'use cache';

import { Product } from '@/gql/graphql';
import { print } from 'graphql';
import { cn } from '@/lib/utils';
import { getAllProductsQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';

const getProducts = async () => {
  const productsData = await fetchGraphQL<{ products: { nodes: Product[] } }>(
    print(getAllProductsQuery)
  );

  if (
    !productsData ||
    !productsData.products ||
    productsData.products.nodes.length === 0
  ) {
    return [];
  }

  return productsData.products.nodes;
};

const ProductList = async ({ className }: { className?: string }) => {
  const products: Product[] = await getProducts();

  if (!products || products.length === 0) {
    return <section>No posts found</section>;
  }

  return (
    <div
      className={cn(
        'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4',
        className
      )}
    >
      {[...products, ...products, ...products].map((product: Product) => (
        <article
          key={product.databaseId}
          className='col-span-2 lg:col-span-3 group px-4 py-6 shadow-xl'
        >
          <Link href={`/products/${product.slug}`}>
            <div className='relative w-full aspect-square overflow-hidden'>
              <Image
                src={product.featuredImage?.node?.sourceUrl || ''}
                alt={product.title || ''}
                fill
                sizes='25vw'
                className='object-cover group-hover:scale-110 transition-all duration-300'
              />
            </div>
            {product.productCategories?.nodes[0].name && (
              <p className='uppercase text-gray-500'>
                {product.productCategories.nodes[0].name}
              </p>
            )}
            <h3 className='text-4xl font-bold'>{product.title}</h3>
            <Button
              variant='textual'
              className='text-accent mt-1 group-hover:after:translate-x-0 group-hover:after:delay-300 group-hover:before:translate-x-full group-hover:before:delay-0'
            >
              Saznajte više
            </Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ProductList;
