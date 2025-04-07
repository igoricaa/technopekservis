import Breadcrumbs from '@/components/breadcrumbs';
import { ContactForm } from '@/components/contact-form';
import GoogleMap from '@/components/google-map';
import HeaderBanner from '@/components/ui/header-banner';
import MailIcon from '@/components/ui/icons/mail-icon';
import MapPinIcon from '@/components/ui/icons/map-pin-icon';
import PhoneIcon from '@/components/ui/icons/phone-icon';
import Link from 'next/link';

const ContactPage = () => {
  const breadcrubmItems = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Kontakt',
      href: '/kontakt',
    },
  ];

  return (
    <main className='pt-28'>
      <HeaderBanner />
      <Breadcrumbs items={breadcrubmItems} />
      <div className='max-w-7xl mx-auto px-side mt-10 sm:mt-20 lg:mt-40 flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-20'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4'>
            Kontaktirajte nas
          </h1>
          <ContactField
            icon={<MapPinIcon className='w-5 h-5' />}
            label='Lazara Mamuzića 26A , Galenika'
            href='https://maps.app.goo.gl/jU7Ph83gihVT1iMB8'
          />
          <ContactField
            icon={<MailIcon className='w-5 h-5' />}
            label='office@technopekservis.rs'
            href='mailto:office@technopekservis.rs'
          />
          <ContactField
            icon={<PhoneIcon className='w-5 h-5' />}
            label='+381 69 1885 177'
            href='tel:+381691885177'
          />

          <p className='mt-4'>
            Ako dolazite kolima, možete nas lako pronaći sa autoputa E-75 ili sa
            magistralnog puta M-21.
          </p>
          <p className='mt-2'>
            Za javni prevoz, naša firma je dostupna autobuskim linijama koje
            prolaze kroz Galeniku. Ukoliko vam je potrebna dodatna pomoć u
            pronalaženju naše lokacije, slobodno nas kontaktirajte i rado ćemo
            vam pomoći.
          </p>
        </div>
        <ContactForm className='lg:min-w-xl' />
      </div>
      <div className='mt-20 lg:mt-40'>
        <GoogleMap />
      </div>
    </main>
  );
};

export default ContactPage;

const ContactField = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Link href={href} target='_blank' className='flex gap-2 items-center w-fit'>
      {icon} <span className='pb-[1px]'>{label}</span>
    </Link>
  );
};
