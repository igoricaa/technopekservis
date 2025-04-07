import Link from 'next/link';
import { cn } from '@/lib/utils';
import MailIcon from './ui/icons/mail-icon';
import MapPinIcon from './ui/icons/map-pin-icon';
import PhoneIcon from './ui/icons/phone-icon';
import GoogleMap from './google-map';

const ContactSection = ({ className }: { className?: string }) => {
  return (
    <section className={cn(className)}>
      <div className='max-w-7xl mx-auto px-side grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4'>
            Kako do nas
          </h2>
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

          <p className='mt-2'>
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
        <div>
          <GoogleMap />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

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
