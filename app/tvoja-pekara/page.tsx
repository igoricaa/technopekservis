import Breadcrumbs from '@/components/breadcrumbs';
import CtaSection from '@/components/cta-section';
import { buttonVariants } from '@/components/ui/button';
import HeaderBanner from '@/components/ui/header-banner';
import { bakeryExamples } from '@/data';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const TvojaPekaraPage = () => {
  const breadcrumbItems = [
    { label: 'Početna', href: '/' },
    { label: 'Tvoja pekara', href: '/tvoja-pekara' },
  ];
  return (
    <main className='pt-28'>
      <HeaderBanner />
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className='text-5xl font-bold lg:text-center mt-10 sm:mt-16 pl-side lg:pl-0'>
        Saveti za tvoju pekaru
      </h1>
      <section className='mt-4 sm:mt-10'>
        {bakeryExamples.map((bakeryExample, index) => (
          <BakeryExampleCard
            key={`${bakeryExample.link}-${index}`}
            {...bakeryExample}
            isReversed={index % 2 !== 0}
          />
        ))}
      </section>

      <CtaSection />
    </main>
  );
};

export default TvojaPekaraPage;

const BakeryExampleCard = ({
  title,
  description,
  link,
  image,
  isReversed = false,
}: {
  title: string;
  description: string;
  link: string;
  image: string | StaticImageData;
  isReversed?: boolean;
}) => {
  return (
    <article
      className={cn(
        isReversed && 'sm:flex-row-reverse bg-black/15',
        'py-16 lg:py-20'
      )}
    >
      <div
        className={cn(
          'flex flex-col sm:flex-row gap-14 lg:gap-16 justify-between items-center max-w-7xl mx-auto px-side',
          isReversed && 'sm:flex-row-reverse'
        )}
      >
        <div className='w-full lg:w-auto'>
          <h2 className='text-3xl sm:text-4xl font-bold'>{title}</h2>
          <p className='mt-3 sm:mt-4'>{description}</p>
          <Link
            href={link}
            className={cn(buttonVariants({ size: 'lg' }), 'mt-4')}
          >
            Saznajte više
          </Link>
        </div>
        <Image src={image} alt={title} width={530} height={400} />
      </div>
    </article>
  );
};
