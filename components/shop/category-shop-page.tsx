import { Product, ProductCategory } from '@/gql/graphql';
import ShopServer from './shop-server';
import Breadcrumbs from '../breadcrumbs';

const CategoryShopPage = ({
  title,
  products,
  categories,
  breadcrumbItems,
}: {
  title: string;
  products: Product[];
  categories: ProductCategory[];
  breadcrumbItems: { label: string; href: string }[];
}) => {
  return (
    <main className='py-28'>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='container mx-auto mt-20'>
        <h1 className='text-5xl font-bold mb-16'>{title}</h1>
        <section className='flex gap-4'>
          {/* <ShopClient products={products} categories={sortedCategories} /> */}
          <ShopServer products={products} categories={categories} />
        </section>
      </div>
    </main>
  );
};

export default CategoryShopPage;
