import { Product } from '@/gql/graphql';
import { getAllProductsQuery } from '@/queries/product-queries';

import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import Image from 'next/image';
import Link from 'next/link';

const ProductPage = async () => {
  const productsData = await fetchGraphQL<{ products: { nodes: Product[] } }>(
    print(getAllProductsQuery)
  );

  console.log(productsData);

  if (
    !productsData ||
    !productsData.products ||
    productsData.products.nodes.length === 0
  ) {
    return <div>No posts found</div>;
  }

  return (
    <main>
      PostsPage
      {/* <PostTemplate node={posts} /> */}
      {productsData.products.nodes.map((product) => (
        <div key={product.databaseId}>
          <div>{product.title}</div>
          <Link href={`/products/${product.slug}`}>Link</Link>
          <div>{product.uri}</div>
          {product.featuredImage?.node?.sourceUrl && (
            <Image
              src={product.featuredImage.node.sourceUrl}
              alt={product.title || ''}
              width={500}
              height={500}
            />
          )}
          <div>{product.productDetails?.advantages}</div>
          <div>{product.productDetails?.characteristics}</div>
          <div>{product.productDetails?.pdf?.node?.uri}</div>
        </div>
      ))}
    </main>
  );
};

export default ProductPage;
