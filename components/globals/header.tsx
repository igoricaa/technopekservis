import Link from 'next/link';
import Logo from '../ui/logo';
import Navigation from './navigation';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className='fixed top-0 z-50 bg-white h-20 backdrop-blur-sm w-full flex items-center justify-between px-side'>
      <Logo className='!w-20' />
      <Navigation />
      <Link href='/kontakt' className={cn(buttonVariants({ size: 'lg' }))}>
        Kontaktirajte nas
      </Link>
    </header>
  );
};

export default Header;
