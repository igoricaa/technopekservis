import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { print } from 'graphql/language/printer';
import { setSeoData } from '@/utils/seo-data';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { ContentNode } from '@/gql/graphql';
import { nextSlugToWpSlug } from '@/utils/next-slug-to-wp-slug';
import { SeoQuery } from '@/queries/general/seo-query';
import Hero from '@/components/hero/hero';
import { ProductGridSection } from '@/components/product/product-grid';
import Image from 'next/image';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import InfiniteSlider from '@/components/infinite-slider';
import ContactSection from '@/components/contact-section';
import { buttonVariants } from '@/components/ui/button';
import { clients } from '@/data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = nextSlugToWpSlug((await params).slug);

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(SeoQuery),
    {
      slug: slug,
      idType: 'URI',
    }
  );

  if (!contentNode) {
    return notFound();
  }

  const metadata = setSeoData({ seo: contentNode.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
    },
  } as Metadata;
}

// export function generateStaticParams() {
//   return [];
// }

export default async function Home({ params }: Props) {
  const slug = nextSlugToWpSlug((await params).slug);

  return (
    <main>
      <Hero />
      <section className='max-w-7xl mx-auto px-side py-20'>
        <h2 className='text-5xl font-bold'>Izabrani proizvodi</h2>
        <ProductGridSection className='mt-16' />
      </section>

      <section className='max-w-7xl mx-auto px-side py-20'>
        <div className='flex gap-16'>
          <div className='space-y-4'>
            <h2 className='text-6xl font-bold mb-5'>O nama</h2>
            <p>
              Naša firma nudi visokokvalitetnu pekarsku opremu i profesionalne
              usluge održavanja, dok ponosno zastupamo širok asortiman opreme
              renomiranih proizvođača.
            </p>
            <p>
              Naš stručni tim pruža najbolja rešenja za vaše poslovanje, pružamo
              brz i efikasan servis koji uključuje redovno održavanje, popravke
              i zamenu delova.
            </p>
            <p>
              Naš cilj je visok nivo zadovoljstva kupaca, stoga nas
              kontaktirajte da saznate više o našim proizvodima i uslugama.
            </p>
            <Link
              href='/o-nama'
              className={cn(buttonVariants({ size: 'lg' }), 'mt-4')}
            >
              Saznajte više
            </Link>
          </div>
          <div className='relative w-full aspect-[720/400]'>
            <Image
              src='/about-us.webp'
              alt='O nama'
              fill
              sizes='(max-width: 1024px) 100vw, 720px'
              className='object-cover'
            />
          </div>
        </div>
      </section>

      <InfiniteSlider data={clients} className='mt-20' />

      <ContactSection className='py-28' />
    </main>
  );
}
