'use client';

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MenuItem } from '@/gql/graphql';
import { cn } from '@/lib/utils';
import { useMobile } from '@/utils/hooks';
import { useState, useRef, useMemo } from 'react';

interface MenuItemWithChildren extends MenuItem {
  children?: MenuItemWithChildren[];
}

interface NavMenuProps {
  menuItems: MenuItem[];
}

export default function NavMenu({ menuItems }: NavMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isMobile = useMobile();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const menuTree = useMemo(() => {
    const menuMap: Record<number, MenuItemWithChildren> = {};
    const rootItems: MenuItemWithChildren[] = [];

    menuItems.forEach((item) => {
      menuMap[item.databaseId] = { ...item, children: [] };
    });

    menuItems.forEach((item) => {
      if (item.parentDatabaseId && menuMap[item.parentDatabaseId]) {
        menuMap[item.parentDatabaseId].children?.push(menuMap[item.databaseId]);
      } else {
        rootItems.push(menuMap[item.databaseId]);
      }
    });

    return rootItems;
  }, [menuItems]);

  // const handleMenuToggle = (menu: string, e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setActiveMenu(activeMenu === menu ? null : menu);
  // };

  const handleMenuHover = (menu: string) => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const handleDropdownHover = () => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  return (
    <nav className='relative z-50'>
      <ul className='flex items-center space-x-1 bg-background'>
        {menuTree.map((item) => {
          if (!item.label || !item.uri) return null;

          if (item.children && item.children.length > 0) {
            return (
              <NavItemWithDropdown
                key={item.databaseId}
                label={item.label}
                active={activeMenu === item.databaseId.toString()}
                // onClick={(e) => handleMenuToggle(item.databaseId.toString(), e)}
                onMouseEnter={() => handleMenuHover(item.databaseId.toString())}
                onMouseLeave={handleMenuLeave}
                onDropdownMouseEnter={handleDropdownHover}
                onDropdownMouseLeave={handleDropdownLeave}
              >
                <TwoPanelMenu items={item.children} />
              </NavItemWithDropdown>
            );
          }

          return (
            <NavItem key={item.databaseId} href={item.uri} label={item.label} />
          );
        })}
      </ul>
    </nav>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className='px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md transition-colors'
      >
        {label}
      </Link>
    </li>
  );
}

function NavItemWithDropdown({
  label,
  active,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDropdownMouseEnter,
  onDropdownMouseLeave,
  children,
}: {
  label: string;
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onDropdownMouseEnter: () => void;
  onDropdownMouseLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <li
      className='relative'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onClick}
        className={cn(
          'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
          active
            ? 'bg-accent text-accent-foreground'
            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            'ml-1 h-4 w-4 transition-transform duration-200',
            active ? 'rotate-180' : ''
          )}
        />
      </button>

      {active && (
        <div
          className='absolute left-0 mt-1 w-[600px] rounded-md border bg-popover shadow-lg'
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={onDropdownMouseEnter}
          onMouseLeave={onDropdownMouseLeave}
        >
          {children}
        </div>
      )}
    </li>
  );
}

function TwoPanelMenu({ items }: { items: MenuItemWithChildren[] }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  // Get the currently active item object
  const currentActiveItem = activeItem
    ? items.find((item) => item.databaseId.toString() === activeItem)
    : null;

  // Get the currently active subitem object
  const currentActiveSubItem =
    activeItem &&
    activeSubItem &&
    currentActiveItem?.children &&
    currentActiveItem.children.length > 0
      ? currentActiveItem.children.find(
          (item) => item.databaseId.toString() === activeSubItem
        )
      : null;

  return (
    <div className='p-2'>
      <div className='grid grid-cols-3 gap-0 border rounded-md'>
        {/* First column - Main categories */}
        <ul className='border-r'>
          {items.map((item) => (
            <li
              key={item.databaseId}
              className={cn(
                'px-3 py-2 text-sm hover:bg-accent cursor-pointer flex items-center justify-between',
                activeItem === item.databaseId.toString() ? 'bg-accent' : ''
              )}
              onMouseEnter={() => {
                setActiveItem(item.databaseId.toString());
                setActiveSubItem(null);
              }}
            >
              {item.children && item.children.length > 0 ? (
                <>
                  <span>{item.label}</span>
                  <ChevronRight className='h-4 w-4' />
                </>
              ) : (
                <Link
                  href={item.uri || ''}
                  className='w-full flex items-center justify-between'
                >
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Second column - Subcategories */}
        <ul className='border-r min-h-[200px]'>
          {activeItem &&
          currentActiveItem?.children &&
          currentActiveItem.children.length > 0 ? (
            <>
              {currentActiveItem.children.map((subItem) => (
                <li
                  key={subItem.databaseId}
                  className={cn(
                    'px-3 py-2 text-sm hover:bg-accent cursor-pointer flex items-center justify-between',
                    activeSubItem === subItem.databaseId.toString()
                      ? 'bg-accent'
                      : ''
                  )}
                  onMouseEnter={() =>
                    setActiveSubItem(subItem.databaseId.toString())
                  }
                >
                  {subItem.children && subItem.children.length > 0 ? (
                    <>
                      <span>{subItem.label}</span>
                      <ChevronRight className='h-4 w-4' />
                    </>
                  ) : (
                    <Link
                      href={subItem.uri || ''}
                      className='w-full flex items-center justify-between'
                    >
                      <span>{subItem.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </>
          ) : (
            <div className='flex items-center justify-center h-full text-sm text-muted-foreground p-4'>
              {activeItem ? (
                <div className='text-center'>
                  <div className='font-medium mb-2'>
                    {currentActiveItem?.label}
                  </div>
                  <p className='text-xs'>
                    {currentActiveItem?.description || 'Idite na kategoriju'}
                  </p>
                </div>
              ) : (
                'Izaberite kategoriju'
              )}
            </div>
          )}
        </ul>

        {/* Third column - Third level items */}
        <div className='min-h-[200px]'>
          {activeSubItem &&
          currentActiveSubItem?.children &&
          currentActiveSubItem.children.length > 0 ? (
            <>
              {currentActiveSubItem.children.map((thirdLevelItem) => (
                <Link
                  key={thirdLevelItem.databaseId}
                  href={thirdLevelItem.uri || ''}
                  className='block px-3 py-2 text-sm hover:bg-accent'
                >
                  {thirdLevelItem.label}
                </Link>
              ))}
            </>
          ) : (
            <div className='flex items-center justify-center h-full text-sm text-muted-foreground p-4'>
              {activeSubItem ? (
                <div className='text-center'>
                  <div className='font-medium mb-2'>
                    {currentActiveSubItem?.label}
                  </div>
                  <p className='text-xs'>
                    {currentActiveSubItem?.description || 'Idite na kategoriju'}
                  </p>
                </div>
              ) : activeItem &&
                currentActiveItem?.children &&
                currentActiveItem.children.length > 0 ? (
                'Izaberite kategoriju'
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
