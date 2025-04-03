import Link from 'next/link';
import Logo from '../ui/logo';
import Navigation from './navigation/navigation';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className='fixed top-0 z-50 bg-white h-28 backdrop-blur-sm w-full flex items-center justify-between px-side'>
      <Link href='/'>
        <Logo className='!w-20' />
      </Link>
      <Navigation />
      <Link href='/kontakt' className={cn(buttonVariants({ size: 'lg' }))}>
        Kontaktirajte nas
      </Link>
    </header>
  );
};

export default Header;
