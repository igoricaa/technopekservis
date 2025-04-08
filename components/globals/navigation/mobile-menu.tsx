'use client';

import Link from 'next/link';
import { useState } from 'react';
import Burger from './burger';
import { MenuItemWithChildren } from '@/utils/types';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

const MobileMenu = ({
  className,
  menuTree,
}: {
  className?: string;
  menuTree: MenuItemWithChildren[];
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [parentAccordionValue, setParentAccordionValue] = useState<string>('');
  const [childAccordionValue, setChildAccordionValue] = useState<string>('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setParentAccordionValue('');
    setChildAccordionValue('');
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <nav className={`${className}`}>
      <Burger handleClick={toggleMenu} isOpen={isMenuOpen} />

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
        <Accordion
          type='single'
          collapsible
          className='w-full'
          value={parentAccordionValue}
          onValueChange={setParentAccordionValue}
        >
          {menuTree.map((menuItem: MenuItemWithChildren) => (
            <AccordionItem
              key={menuItem.label}
              value={menuItem.label || 'menu'}
              className='border-none'
            >
              {menuItem.children && menuItem.children.length > 0 ? (
                <>
                  <AccordionTrigger
                    className='text-2xl text-white font-normal font-open-sans py-2 hover:no-underline justify-normal'
                    noIcon
                  >
                    {menuItem.label}
                    <ChevronDown className='h-8 w-8 shrink-0 fill-white text-white transition-transform duration-200' />
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className='pl-4'>
                      {menuItem.children.map((child) => (
                        <li key={child.label}>
                          {child.children && child.children.length > 0 ? (
                            <Accordion
                              type='single'
                              collapsible
                              className='w-full'
                              value={childAccordionValue}
                              onValueChange={setChildAccordionValue}
                            >
                              <AccordionItem
                                value={child.label || 'submenu'}
                                className='border-none'
                              >
                                <AccordionTrigger
                                  className='text-xl text-white font-normal font-open-sans hover:no-underline py-2 justify-normal'
                                  noIcon
                                >
                                  {child.label}
                                  <ChevronDown className='h-7 w-7 shrink-0 fill-white text-white transition-transform duration-200' />
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className='pl-4'>
                                    {child.children.map((subChild) => (
                                      <li key={subChild.label}>
                                        <Link
                                          href={subChild.uri || ''}
                                          onClick={toggleMenu}
                                          className='text-xl text-white block py-2 hover:text-gray-300'
                                        >
                                          {subChild.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          ) : (
                            <Link
                              href={child.uri || ''}
                              onClick={toggleMenu}
                              className='text-xl text-white block py-2 hover:text-gray-300'
                            >
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </>
              ) : (
                <Link
                  href={menuItem.uri || ''}
                  onClick={toggleMenu}
                  className='text-2xl text-white block py-2 hover:text-gray-300'
                >
                  {menuItem.label}
                </Link>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </nav>
  );
};

export default MobileMenu;
