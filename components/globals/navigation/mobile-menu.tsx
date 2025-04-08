'use client';

import Link from 'next/link';
import { useState } from 'react';
import Burger from './burger';
import { MenuItemWithChildren } from '@/utils/types';

const MobileMenu = ({
  className,
  menuTree,
  activeMenu,
  pathname,
  handleMenuHover,
  handleMenuLeave,
}: {
  className?: string;
  menuTree: MenuItemWithChildren[];
  activeMenu: string | null;
  pathname: string;
  handleMenuHover: (menu: string) => void;
  handleMenuLeave: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    toggleScroll();
  };

  const toggleScroll = () => {
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  return (
    <div className={`${className}`}>
      <div className='flex items-center gap-6 sm:gap-8 z-50 relative '>
        <Burger handleClick={toggleMenu} isOpen={menuOpen} />
      </div>

      <div
        className={`fixed inset-0 h-svh w-screen z-40 px-side pt-28 sm:pt-48 pb-8 sm:pb-16 bg-background flex flex-col justify-between gap-8 transition-all duration-300 ${
          menuOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <ul className='flex flex-col gap-4 sm:gap-6'>
          {menuTree.map((route: MenuItemWithChildren) => (
            <li key={route.id}>
              <Link
                href={route.uri || ''}
                className='uppercase text-3xl sm:text-4xl'
                onClick={toggleMenu}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
