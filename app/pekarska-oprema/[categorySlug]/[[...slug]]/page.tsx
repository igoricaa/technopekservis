import { Product, ProductCategory } from '@/gql/graphql';
import {
  getProductBySlugQuery,
  getProductsByCategoryQuery,
} from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import { notFound } from 'next/navigation';
import { ProductImage } from '@/components/product/product-image';
import { ProductDetails } from '@/components/product/product-details';
import { ProductCard } from '@/components/product/product-grid';
import { getCategoryHierarchy } from '@/utils/utils';
import Link from 'next/link';
import { Suspense } from 'react';

interface ProductPageProps {
  params: Promise<{
    categorySlug: string;
    slug: string;
  }>;
}

interface ProductData {
  product: Product;
}

interface RelatedProductsData {
  productCategory: {
    slug: string;
    ancestors: { nodes: { slug: string }[] };
    products: { nodes: Product[] };
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { categorySlug, slug } = await params;

  let subcategorySlug, productSlug;

  if (slug.length === 1) {
    productSlug = slug[0];
  } else {
    [subcategorySlug, productSlug] = slug;
  }

  const primaryUrlCategorySlug = slug[slug.length - 2];

  const { product } = await fetchGraphQL<ProductData>(
    print(getProductBySlugQuery),
    { slug: productSlug }
  );

  if (!product?.productCategories?.edges) {
    notFound();
  }

  const primaryCategory = product.productCategories.edges.find(
    (category: any) => category.isPrimary
  )?.node as ProductCategory;

  if (!primaryCategory || primaryCategory.slug !== primaryUrlCategorySlug) {
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
            category={primaryCategory.name || ''}
            advantages={product.productDetails?.advantages}
            characteristics={product.productDetails?.characteristics}
            pdfUri={product.productDetails?.pdf?.node?.uri}
          />
        </article>

        <section className='mt-32'>
          <h4 className='text-5xl font-bold mb-4'>Slični proizvodi</h4>
          <Suspense fallback={<RelatedProductsSkeleton />}>
            <RelatedProducts
              categorySlug={primaryCategory.slug}
              productSlug={productSlug}
              categoryHierarchy={categoryHierarchyPath}
            />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default ProductPage;

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

const RelatedProductsSkeleton = () => (
  <div className='grid grid-cols-12 gap-4'>
    {[...Array(4)].map((_, i) => (
      <div key={i} className='col-span-3'>
        <div className={`aspect-square bg-black/50 rounded ${shimmer}`} />
      </div>
    ))}
  </div>
);

const RelatedProducts = async ({
  categorySlug,
  productSlug,
  categoryHierarchy,
}: {
  categorySlug: string;
  productSlug: string;
  categoryHierarchy: string;
}) => {
  const { productCategory } = await fetchGraphQL<RelatedProductsData>(
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
        primaryCategory={productCategory.slug}
        productLink={`/${categoryHierarchy}/${product.slug}`}
        className={'lg:!col-span-4'}
      />
    ));

  if (relatedProducts.length === 0) return null;

  return <div className='grid grid-cols-12 gap-4'>{relatedProducts}</div>;
};
