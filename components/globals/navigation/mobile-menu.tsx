'use client';

import Link from 'next/link';
import { useState } from 'react';
import Burger from './burger';
import { MenuItemWithChildren } from '@/utils/types';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const MobileMenu = ({
  className,
  menuTree,
  activeMenu,
  pathname,
}: {
  className?: string;
  menuTree: MenuItemWithChildren[];
  activeMenu: string | null;
  pathname: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // toggleScroll();
  };

  const toggleScroll = () => {
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <nav className={`${className}`}>
      <div className='flex items-center gap-6 sm:gap-8 z-50 relative '>
        <Burger handleClick={toggleMenu} isOpen={isMenuOpen} />
      </div>

      <div
        className={cn(
          `fixed inset-0 h-screen w-screen z-40 bg-transparent transition-all duration-300 ${
            isMenuOpen
              ? 'bg-black/30 pointer-events-auto'
              : 'pointer-events-none'
          }`
        )}
      />

      <div
        className={`fixed right-0 top-0 h-svh w-screen sm:w-md z-40 px-side pt-2.5 pb-8 sm:pb-16 flex flex-col gap-12 sm:gap-16 transition-all duration-300 bg-black ${
          isMenuOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <Link href='/'>
          <Logo className='w-15 sm:w-18' />
        </Link>
        <ul className='space-y-4'>
          {menuTree.map((route: MenuItemWithChildren) => (
            <li key={route.id}>
              <Link
                href={route.uri || ''}
                className='text-2xl text-white'
                onClick={toggleMenu}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MobileMenu;
