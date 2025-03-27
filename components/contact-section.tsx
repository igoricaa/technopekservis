import Link from 'next/link';
import { cn } from '@/lib/utils';
import MailIcon from './ui/icons/mail-icon';
import MapPinIcon from './ui/icons/map-pin-icon';
import PhoneIcon from './ui/icons/phone-icon';

const ContactSection = ({ className }: { className?: string }) => {
  return (
    <section className={cn(className)}>
      <div className='max-w-7xl mx-auto px-side grid grid-cols-1 md:grid-cols-2 gap-16'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-6xl font-bold mb-4'>Kako do nas</h2>
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
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.1623465777498!2d20.36372407663342!3d44.85898967361487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a676405f837c3%3A0xb128603f94cbf43b!2sTECHNO%20PEK%20SERVIS%20BEOGRAD!5e0!3m2!1sen!2snl!4v1682516263639!5m2!1sen!2snl'
            width='100%'
            height='400'
          ></iframe>
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
    <Link
      href={href}
      target='_blank'
      className='flex gap-2 items-center w-fit group'
    >
      {icon}{' '}
      <span className='pb-[1px] underline-animated group-hover:after:translate-x-0 group-hover:after:delay-300 group-hover:before:translate-x-full group-hover:before:delay-0'>
        {label}
      </span>
    </Link>
  );
};
