import { Product, ProductCategory } from '@/gql/graphql';
import { print } from 'graphql';
import { cn } from '@/lib/utils';
import { getAllProductsQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Suspense } from 'react';
import { getCategoryHierarchy } from '@/utils/utils';

const getProducts = async () => {
  const productsData = await fetchGraphQL<{ products: { nodes: Product[] } }>(
    print(getAllProductsQuery)
  );

  if (!productsData?.products?.nodes) {
    return [];
  }

  return productsData.products.nodes;
};

export const ProductGridSection = ({ className }: { className?: string }) => {
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

const ProductGrid = async () => {
  const products: Product[] = await getProducts();

  if (!products || products.length === 0) {
    return <section>No products found</section>;
  }

  return products.map((product: Product) => {
    const primaryCategory = product.productCategories?.edges.find(
      (category: any) => category.isPrimary
    )?.node as ProductCategory;

    const { categoryHierarchyPath } = getCategoryHierarchy(primaryCategory);
    const productLink = `/${categoryHierarchyPath}/${product.slug}`;

    return (
      <ProductCard
        key={product.slug}
        productTitle={product.title || ''}
        productImage={product.featuredImage?.node?.sourceUrl || ''}
        primaryCategory={primaryCategory.name || ''}
        productLink={productLink}
      />
    );
  });
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

export const ProductCard = ({
  productTitle,
  productImage,
  primaryCategory,
  productLink,
  className,
}: {
  productTitle: string;
  productImage: string;
  primaryCategory: string;
  productLink: string;
  className?: string;
}) => {
  return (
    <article
      className={cn(
        'col-span-2 lg:col-span-3 group px-4 py-6 shadow-xl',
        className
      )}
      role='article'
      aria-label={`Product: ${productTitle}`}
    >
      <Link href={productLink} aria-label={`View details for ${productTitle}`}>
        <div className='relative w-full aspect-square overflow-hidden'>
          <Image
            src={productImage}
            alt={productTitle}
            fill
            sizes='25vw'
            className='object-cover group-hover:scale-110 transition-all duration-300'
            priority={false}
          />
        </div>

        <p className='uppercase text-gray-500'>{primaryCategory}</p>

        <h3 className='text-4xl font-bold'>{productTitle}</h3>
        <Button
          variant='textual'
          className='text-accent mt-1 group-hover:after:translate-x-0 group-hover:after:delay-300 group-hover:before:translate-x-full group-hover:before:delay-0'
          aria-label={`Saznaj više o ${productTitle}`}
        >
          Saznajte više
        </Button>
      </Link>
    </article>
  );
};
