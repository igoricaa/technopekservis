import { ProductCategory } from '@/gql/graphql';
import { getProductBySlugQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { getCategoryHierarchySlugsAndNames } from '@/utils/utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ProductDetails } from './product-details';
import { ProductImage } from './product-image';
import { RelatedProductsSkeleton, RelatedProducts } from './related-products';
import { print } from 'graphql';
import { ProductData } from '@/utils/types';
import Breadcrumbs from '../breadcrumbs';

const ProductPage = async ({
  categorySlug,
  productSlug,
}: {
  categorySlug: string;
  productSlug: string;
}) => {
  const { product } = await fetchGraphQL<ProductData>(
    print(getProductBySlugQuery),
    { slug: productSlug }
  );

  if (!product?.productCategories?.edges) {
    notFound();
  }

  const isInCategory = product.productCategories.edges.some(
    (category: any) => category.node.slug === categorySlug
  );

  if (!isInCategory) {
    notFound();
  }

  const primaryCategory = product.productCategories.edges.find(
    (category: any) => category.isPrimary
  )?.node as ProductCategory;

  if (!primaryCategory?.slug) {
    notFound();
  }

  const { slugs, names } = getCategoryHierarchySlugsAndNames(
    primaryCategory as ProductCategory
  );

  const categoryHierarchyPath = [...slugs].join('/');

  return (
    <main className='py-18 sm:py-20 lg:py-28'>
      <Breadcrumbs
        items={[
          { label: 'Početna', href: '/' },
          ...slugs.map((slug, index) => ({
            label: names[index],
            href: `/${slugs.slice(0, index + 1).join('/')}`,
          })),
          {
            label: product.title || '',
            href: `/${categoryHierarchyPath}/${productSlug}`,
          },
        ]}
      />
      <div className='max-w-7xl w-full mx-auto'>
        <article className='grid px-side md:grid-cols-2 gap-8 pt-10 sm:pt-24 lg:pt-30'>
          <ProductImage
            src={product.featuredImage?.node?.sourceUrl || ''}
            alt={product.title}
          />

          <ProductDetails
            title={product.title || ''}
            advantages={product.productDetails?.advantages}
            characteristics={product.productDetails?.characteristics}
            pdfUri={product.productDetails?.pdf?.node?.uri}
          />
        </article>

        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts
            categorySlug={primaryCategory.slug}
            productSlug={productSlug}
            categoryHierarchy={categoryHierarchyPath}
          />
        </Suspense>
      </div>
    </main>
  );
};

export default ProductPage;
