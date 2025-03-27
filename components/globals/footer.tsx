import Image from 'next/image';
import Link from 'next/link';
import InstagramIcon from '../ui/icons/instagram-icon';
import FacebookIcon from '../ui/icons/facebook-icon';
import { getMenuItems } from '@/queries/menu-query';
import { Suspense } from 'react';
import MapPinIcon from '../ui/icons/map-pin-icon';
import MailIcon from '../ui/icons/mail-icon';
import PhoneIcon from '../ui/icons/phone-icon';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer className='pt-20 pb-6 bg-black'>
      <div className='max-w-7xl mx-auto px-side border-b border-white/20 pb-10 flex justify-between gap-10'>
        <div>
          <div className='relative w-44 aspect-[250/203]'>
            <Image
              src='/technopek-servis-logo.webp'
              alt='Techno Pek Servis'
              fill
              sizes='250px'
              className='object-cover'
            />
          </div>
          <div className='mt-8 space-y-2'>
            <p className='text-xl text-white'>Zapratite nas</p>
            <ContactField
              icon={InstagramIcon}
              label='@techno_pek_servis'
              href='https://www.instagram.com/techno_pek_servis/'
            />
            <ContactField
              icon={FacebookIcon}
              label='Pekarska oprema Techno PEK Servis'
              href='https://www.facebook.com/pekarskaoprematechnopek'
            />
          </div>
        </div>

        <div>
          <p className='text-xl text-white'>Mapa sajta</p>
          <Suspense fallback={<div className='text-white'>Loading...</div>}>
            <MenuItems className='mt-2' />
          </Suspense>
        </div>
        <div>
          <p className='text-xl text-white'>Kontakt</p>
          <ContactField
            icon={MapPinIcon}
            label='Lazara Mamuzića 26A , Galenika'
            href='https://maps.app.goo.gl/jU7Ph83gihVT1iMB8'
            className='mt-2'
          />
          <ContactField
            icon={MailIcon}
            label='office@technopekservis.rs'
            href='mailto:office@technopekservis.rs'
          />
          <ContactField
            icon={PhoneIcon}
            label='+381 69 1885 177'
            href='tel:+381691885177'
          />
        </div>
        <div>
          <p className='text-xl text-white'>Osnovni podaci firme</p>
          <ul className='mt-2'>
            <li>
              <p className='text-white'>Techno Pek Servis</p>
            </li>
            <li>
              <p className='text-white'>Nićifora Ninkovića 49, 11090 Beograd</p>
            </li>
            <li>
              <p className='text-white'>PIB: 110105919</p>
            </li>
            <li>
              <p className='text-white'>MB: 64655329</p>
            </li>
          </ul>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-side flex justify-between items-center pt-6'>
        <p className='text-white'>ⓒ Copyright 2025 Techno Pek Servis</p>
        <Link href='https://iza.rs' target='_blank' className='text-white'>
          Developed by Iza
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

interface ContactFieldProps {
  icon: React.FC<React.SVGProps<SVGElement>>;
  label: string;
  href: string;
  className?: string;
}

const ContactField = ({
  icon: Icon,
  label,
  href,
  className,
}: ContactFieldProps) => {
  return (
    <Link
      href={href}
      target='_blank'
      className={cn(
        'flex gap-2 items-center w-fit group whitespace-nowrap',
        className
      )}
    >
      <Icon className='w-5 h-5' stroke='white' />
      <span className='text-white'>{label}</span>
    </Link>
  );
};

const MenuItems = async ({ className }: { className?: string }) => {
  const menuItems = await getMenuItems();

  return (
    <ul className={className}>
      {menuItems.map((menuItem) => {
        if (!menuItem.uri) return null;

        return (
          <li key={menuItem.uri} className='text-white'>
            <Link itemProp='url' href={menuItem.uri}>
              {menuItem.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
