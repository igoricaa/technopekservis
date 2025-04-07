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
    <main className='py-16 sm:py-28'>
      <Breadcrumbs items={breadcrumbItems} />
      <div className='container px-side mx-auto mt-10 sm:mt-20'>
        <h1 className='text-5xl font-bold mb-8 sm:mb-10 lg:mb-16'>{title}</h1>
        <section className='flex flex-col lg:flex-row gap-8 sm:gap-4'>
          <ShopServer products={products} categories={categories} />
        </section>
      </div>
    </main>
  );
};

export default CategoryShopPage;
