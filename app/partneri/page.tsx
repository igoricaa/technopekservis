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
    <main className='pt-28'>
      <HeaderBanner />
      <Breadcrumbs items={breadcrumbItems} />

      <div className='max-w-7xl mx-auto px-side pb-30'>
        <h1 className='text-6xl font-bold text-center mt-26'>
          Techno Pek Servis partneri
        </h1>
        <section className='mt-22 space-y-20'>
          {partners.map((partner: Partner, index: number) => (
            <PartnerCard key={`partner-${index}`} partner={partner} />
          ))}
        </section>
      </div>
      <CtaSection />
    </main>
  );
};

export default Partners;

const PartnerCard = ({ partner }: { partner: Partner }) => {
  return (
    <article className='flex gap-10 justify-between items-center'>
      <div className='relative max-w-sm w-72 aspect-square'>
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className='object-contain'
        />
      </div>
      <div className='max-w-3/5 w-full'>
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
