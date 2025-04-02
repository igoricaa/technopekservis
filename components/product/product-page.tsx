import { ProductCategory } from '@/gql/graphql';
import { getProductBySlugQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { getCategoryHierarchy } from '@/utils/utils';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ProductDetails } from './product-details';
import { ProductImage } from './product-image';
import { RelatedProductsSkeleton, RelatedProducts } from './related-products';
import Link from 'next/link';
import { print } from 'graphql';
import { ProductData } from '@/utils/types';

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

  // Check if the product belongs to the category or subcategory
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

  const { categoryHierarchyPath, categoryHierarchyNames } =
    getCategoryHierarchy(primaryCategory as ProductCategory);

  return (
    <main className='px-4 pb-32 pt-40'>
      <div className='px-40'>
        <Link href={`/${categoryHierarchyPath}/${productSlug}`}>
          {categoryHierarchyNames} / {product.title}
        </Link>
      </div>
      <div className='max-w-7xl w-full mx-auto'>
        <article className='grid md:grid-cols-2 gap-8 pt-30'>
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
