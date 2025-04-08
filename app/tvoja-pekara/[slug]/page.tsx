import Breadcrumbs from '@/components/breadcrumbs';
import CtaSection from '@/components/cta-section';
import { buttonVariants } from '@/components/ui/button';
import HeaderBanner from '@/components/ui/header-banner';
import { bakeryExamples } from '@/data';
import { cn } from '@/lib/utils';
import { nextSlugToWpSlug } from '@/utils/next-slug-to-wp-slug';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return bakeryExamples.map((example) => ({
    slug: example.slug,
  }));
}

const TvojaPekaraExamplePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = nextSlugToWpSlug((await params).slug);

  const bakeryExample = bakeryExamples.find((example) => example.slug === slug);

  if (!bakeryExample) {
    return notFound();
  }

  return (
    <main className='pt-18 sm:pt-20 lg:pt-28'>
      <HeaderBanner />

      <Breadcrumbs
        items={[
          { label: 'Početna', href: '/' },
          { label: 'Tvoja pekara', href: '/tvoja-pekara' },
          { label: bakeryExample.title, href: `/tvoja-pekara/${slug}` },
        ]}
      />
      <h1 className='text-4xl sm:text-5xl font-bold pl-side lg:pl-0 lg:text-center mt-10 sm:mt-16'>
        {bakeryExample.title}
      </h1>
      <section className='max-w-7xl mx-auto mt-16 sm:mt-20 lg:mt-24 px-side pb-16 sm:pb-24 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between'>
        <Image
          src={bakeryExample.image}
          alt={bakeryExample.title}
          width={530}
          height={400}
          className='w-full max-w-lg'
        />
        <div className='w-full lg:w-auto'>
          <h2 className='text-3xl sm:text-4xl font-bold'>Oprema:</h2>
          <ol className='mt-3 sm:mt-5 space-y-1 pl-6'>
            {bakeryExample.equipment.map((equipment, index) => (
              <li key={`equipment-${index}`} className='list-decimal'>
                {equipment}
              </li>
            ))}
          </ol>
          <Link
            href='/kontakt'
            className={cn(buttonVariants({ size: 'lg' }), 'mt-6')}
          >
            Saznajte više
          </Link>
        </div>
      </section>
      <CtaSection />
    </main>
  );
};

export default TvojaPekaraExamplePage;
