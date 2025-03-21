import { Product, ProductCategory } from '@/gql/graphql';
import { getProductCategoryBySlugQuery } from '@/queries/category-queries';
import { getProductBySlugQuery } from '@/queries/product-queries';

import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import Image from 'next/image';

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const productData = await fetchGraphQL<{ product: Product }>(
    print(getProductBySlugQuery),
    {
      slug: slug,
    }
  );

  const productCategoryData = await fetchGraphQL<{
    productCategory: ProductCategory;
  }>(print(getProductCategoryBySlugQuery), {
    slug: productData.product.productCategories?.nodes[0]?.slug || '',
  });

  console.log('TEST:', productCategoryData);

  const product = productData.product;
  const productCategory = productCategoryData.productCategory;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main>
      ProductPage
      <h1>{productCategory.name}</h1>
      <div key={product.id}>
        <div>{product.title}</div>
        {product.featuredImage?.node?.sourceUrl && (
          <Image
            src={product.featuredImage.node.sourceUrl}
            alt={product.title || ''}
            width={500}
            height={500}
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: product.productDetails?.advantages || '',
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: product.productDetails?.characteristics || '',
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: product.productDetails?.pdf?.node?.uri || '',
          }}
        />
      </div>
    </main>
  );
};

export default ProductPage;
