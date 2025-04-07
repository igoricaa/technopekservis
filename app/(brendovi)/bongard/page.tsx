import BrandCategoryCard from '@/components/brands/brand-category-card';
import Breadcrumbs from '@/components/breadcrumbs';
import { ProductGrid } from '@/components/product/product-grid';
import HeaderBanner from '@/components/ui/header-banner';
import VideosSlider from '@/components/videos-slider';
import { bongardVideos } from '@/data';
import { Product } from '@/gql/graphql';
import { getProductsByIdsQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import Image from 'next/image';

const getBongardProducts = async () => {
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

const BongardPage = async () => {
  const products: Product[] = await getBongardProducts();

  return (
    <main className='pt-28'>
      <HeaderBanner />
      <Breadcrumbs
        items={[
          { label: 'Početna', href: '/' },
          { label: 'Bongard', href: '/bongard' },
        ]}
      />

      <section className='max-w-7xl mx-auto pt-16 sm:pt-20 pb-16 sm:pb-24 lg:pb-32'>
        <Image
          src='/brendovi/bongard/bongard-logo.png'
          alt='Bongard pekarska oprema logo'
          width={206}
          height={35}
          priority
          quality={100}
          className='object-cover mx-auto'
        />
        <p className='text-center mt-7 max-w-3xl mx-auto'>
          Njihova široka paleta opreme za pečenje, njihove proizvodne jedinice
          visokih performansi i njihovi inovativni kapaciteti čine Bongard
          privilegovanim partnerom u sektoru pripreme, održavanja i pečenja.
        </p>
      </section>
      <section className='bg-black py-16 sm:py-24 lg:py-32'>
        <div className='max-w-7xl mx-auto px-side lg:px-0'>
          <h2 className='text-white lg:text-center text-4xl sm:text-5xl font-bold'>
            Kompletan asortiman Bongard opreme
            <br />
            prilagođen vašim potrebama
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12'>
            {bongardCategories.map((category) => (
              <BrandCategoryCard
                key={category.name}
                {...category}
                brandName='Bongard'
              />
            ))}
          </div>
        </div>
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
        <VideosSlider videos={bongardVideos} />
      </section>
    </main>
  );
};

export default BongardPage;

const bongardCategories = [
  {
    name: 'Priprema',
    image: '/brendovi/bongard/bongard-priprema-bg.jpg',
    link: '/pekarska-oprema/priprema',
    color: '#feec34',
  },
  {
    name: 'Podela i oblikovanje',
    image: '/brendovi/bongard/bongard-podela-oblikovanje-bg.jpg',
    link: '/pekarska-oprema/podela-i-oblikovanje',
    color: '#16a853',
  },
  {
    name: 'Fermentacija i održavanje',
    image: '/brendovi/bongard/bongard-fermentacija-odrzavanje-bg.jpg',
    link: '/pekarska-oprema/fermentacija-i-odrzavanje',
    color: '#1793cd',
  },
  {
    name: 'Pečenje',
    image: '/brendovi/bongard/bongard-pecenje-bg.jpg',
    link: '/pekarska-oprema/pekarske-peci',
    color: '#ec433c',
  },
];
