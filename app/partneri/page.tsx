import { Partner, partners } from '@/data';

import HeaderBanner from '@/components/ui/header-banner';
import CtaSection from '@/components/cta-section';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Breadcrumbs from '@/components/breadcrumbs';

const Partners = () => {
  const breadcrumbItems = [
    { label: 'Početna', href: '/' },
    { label: 'Partneri', href: '/partneri' },
  ];
  return (
    <main className='pt-18 sm:pt-20 lg:pt-28'>
      <HeaderBanner />
      <Breadcrumbs items={breadcrumbItems} />

      <div className='max-w-7xl mx-auto px-side pb-16 lg:pb-30'>
        <h1 className='text-5xl lg:text-6xl font-bold lg:text-center mt-10 sm:mt-20 lg:mt-20'>
          Techno Pek Servis partneri
        </h1>
        <section className='mt-18 sm:my-20 lg:mt-22 space-y-12'>
          {partners.map((partner: Partner, index: number) => (
            <PartnerCard
              key={`partner-${index}`}
              partner={partner}
              index={index}
            />
          ))}
        </section>
      </div>
      <CtaSection />
    </main>
  );
};

export default Partners;

const PartnerCard = ({
  partner,
  index,
}: {
  partner: Partner;
  index: number;
}) => {
  return (
    <article
      className={cn(
        'flex flex-col-reverse sm:flex-row gap-10 justify-between items-center',
        index !== 0 && 'border-t border-black/20 pt-12'
      )}
    >
      <div
        className={cn(
          'relative sm:max-w-sm w-full sm:w-72',
          partner.logo.aspectRatio
        )}
      >
        <Image
          src={partner.logo.src}
          alt={partner.name}
          fill
          sizes='(max-width: 640px) 640px, 290px'
          className='object-contain'
        />
      </div>
      <div className='sm:max-w-3/5 w-full'>
        <h2 className='text-4xl font-bold'>{partner.name}</h2>
        <p className=' text-gray-500 mt-4'>{partner.description}</p>

        {partner.link && (
          <Link
            href={partner.link}
            className={cn(buttonVariants({ size: 'lg' }), 'mt-4')}
            target='_blank'
          >
            Saznajte više
          </Link>
        )}
      </div>
    </article>
  );
};
