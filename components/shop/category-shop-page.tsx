import { Product, ProductCategory } from '@/gql/graphql';
import ShopServer from './shop-server';

const CategoryShopPage = ({
  title,
  products,
  categories,
}: {
  title: string;
  products: Product[];
  categories: ProductCategory[];
}) => {
  return (
    <main className='container mx-auto py-44'>
      <h1 className='text-5xl font-bold mb-16'>{title}</h1>
      <section className='flex gap-4'>
        {/* <ShopClient products={products} categories={sortedCategories} /> */}
        <ShopServer products={products} categories={categories} />
      </section>
    </main>
  );
};

export default CategoryShopPage;
