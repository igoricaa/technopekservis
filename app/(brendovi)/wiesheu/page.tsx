import WiesheuLogo from '@/components/brands/wiesheu-logo';
import Breadcrumbs from '@/components/breadcrumbs';
import { ProductGrid } from '@/components/product/product-grid';
import HeaderBanner from '@/components/ui/header-banner';
import VideosSlider from '@/components/videos-slider';
import { wiesheuVideos } from '@/data';
import { Product } from '@/gql/graphql';
import { getProductsByIdsQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';

const getWiesheuProducts = async () => {
  const productsData = await fetchGraphQL<{
    products: { nodes: Product[] };
  }>(print(getProductsByIdsQuery), {
    in: ['40', '38', '29', '42'],
  });

  if (
    !productsData?.products?.nodes ||
    productsData.products.nodes.length === 0
  ) {
    return [];
  }

  return productsData.products.nodes;
};

const WiesheuPage = async () => {
  const products: Product[] = await getWiesheuProducts();

  return (
    <main className='pt-18 sm:pt-20 lg:pt-28'>
      <HeaderBanner />
      <Breadcrumbs
        items={[
          { label: 'Početna', href: '/' },
          { label: 'Wiesheu', href: '/wiesheu' },
        ]}
      />

      <section className='max-w-7xl mx-auto pt-5 sm:pt-16 lg:pt-24 pb-16 sm:pb-24 lg:pb-32'>
        <WiesheuLogo className='max-w-sm mx-auto' />
        <p className='text-center max-w-3xl mx-auto -mt-6'>
          Wiesheu predstavlja inovativne proizvode i rešenja za profesionalne
          korisnike peći za pečenje u prodaji i to dopunjuje odličnom uslugom za
          korisnike.
        </p>
      </section>

      <section className='py-16 sm:py-24 lg:py-32 bg-black/10'>
        <div className='max-w-7xl mx-auto px-side'>
          <h2 className='lg:text-center text-4xl sm:text-5xl font-bold'>
            Novi i istaknuti proizvodi
          </h2>

          <div className='w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 mt-12'>
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
      <section className='max-w-7xl mx-auto pt-16 pb-8'>
        <VideosSlider videos={wiesheuVideos} />
      </section>
    </main>
  );
};

export default WiesheuPage;
