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

interface ProductPageProps {
  params: Promise<{
    categorySlug: string;
    slug: string;
  }>;
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

  const { product } = await fetchGraphQL<{ product: Product }>(
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

  return (
    <main className='max-w-7xl w-full mx-auto px-4 pb-32 pt-40'>
      <article className='grid md:grid-cols-2 gap-8'>
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

      <RelatedProducts
        categorySlug={primaryCategory.slug}
        productSlug={productSlug}
      />
    </main>
  );
};

export default ProductPage;

const RelatedProducts = async ({
  categorySlug,
  productSlug,
}: {
  categorySlug: string;
  productSlug: string;
}) => {
  const productsData = await fetchGraphQL<{
    productCategory: {
      slug: string;
      ancestors: { nodes: { slug: string }[] };
      products: { nodes: Product[] };
    };
  }>(print(getProductsByCategoryQuery), { slug: categorySlug });

  const products = productsData.productCategory.products.nodes;
  const primaryCategory = productsData.productCategory;
  const categoryHierarchy = getCategoryHierarchy(
    primaryCategory as ProductCategory
  );

  const relatedProducts = products.reduce<React.ReactElement[]>(
    (acc, product) => {
      if (product.slug !== productSlug) {
        acc.push(
          <ProductCard
            key={product.slug}
            productTitle={product.title || ''}
            productImage={product.featuredImage?.node?.sourceUrl || ''}
            primaryCategory={primaryCategory.slug}
            productLink={`/${categoryHierarchy}/${product.slug}`}
            className={`!col-span-${Math.min(
              Math.floor(12 / (products.length - 1))
            )}`}
          />
        );
      }
      return acc;
    },
    []
  );

  return (
    <section className='mt-32'>
      <h4 className='text-5xl font-bold mb-4'>Slični proizvodi</h4>
      <div className='grid grid-cols-12 gap-4'>{relatedProducts}</div>
    </section>
  );
};
