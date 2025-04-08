'use client';

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MenuItem } from '@/gql/graphql';
import { cn } from '@/lib/utils';
import { useMobile } from '@/utils/hooks';
import { useState, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import { MenuItemWithChildren } from '@/utils/types';

interface NavMenuProps {
  menuItems: MenuItem[];
}

export default function NavMenu({ menuItems }: NavMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isMobile = useMobile(1280);
  const pathname = usePathname();

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

  const handleMenuHover = (menu: string) => {
    if (isMobile) return;
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    if (isMobile) return;
    setActiveMenu(null);
  };

  const handleDropdownHover = () => {
    if (isMobile) return;
  };

  const handleDropdownLeave = () => {
    if (isMobile) return;
    setActiveMenu(null);
  };

  return (
    <>
      {isMobile ? (
        <NavMenuMobile menuTree={menuTree} />
      ) : (
        <NavMenuDesktop
          menuTree={menuTree}
          activeMenu={activeMenu}
          pathname={pathname}
          handleMenuHover={handleMenuHover}
          handleMenuLeave={handleMenuLeave}
          handleDropdownHover={handleDropdownHover}
          handleDropdownLeave={handleDropdownLeave}
        />
      )}
    </>
  );
}

const NavMenuMobile = ({ menuTree }: { menuTree: MenuItemWithChildren[] }) => {
  return <MobileMenu menuTree={menuTree} />;
};

const NavMenuDesktop = ({
  menuTree,
  activeMenu,
  pathname,
  handleMenuHover,
  handleMenuLeave,
  handleDropdownHover,
  handleDropdownLeave,
}: {
  menuTree: MenuItemWithChildren[];
  activeMenu: string | null;
  pathname: string;
  handleMenuHover: (menu: string) => void;
  handleMenuLeave: () => void;
  handleDropdownHover: () => void;
  handleDropdownLeave: () => void;
}) => {
  return (
    <nav className='hidden lg:block relative z-50'>
      <ul className='flex items-center space-x-1 bg-background'>
        {menuTree.map((item) => {
          if (!item) return null;

          const isActive =
            pathname === item.uri ||
            (pathname.startsWith(item.uri || '') && item.uri !== '/');

          if (item.children && item.children.length > 0) {
            return (
              <NavItemWithDropdown
                key={item.databaseId}
                href={item.uri || ''}
                label={item.label || ''}
                isActive={isActive}
                active={activeMenu === item.databaseId.toString()}
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
            <NavItem
              key={item.databaseId}
              href={item.uri || ''}
              label={item.label || ''}
              isActive={isActive}
            />
          );
        })}
      </ul>
    </nav>
  );
};

function NavItem({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          'px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-md transition-colors',
          isActive ? 'bg-accent text-accent-foreground' : ''
        )}
      >
        {label}
      </Link>
    </li>
  );
}

function NavItemWithDropdown({
  href,
  label,
  isActive,
  active,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDropdownMouseEnter,
  onDropdownMouseLeave,
  children,
}: {
  label: string;
  href: string;
  isActive: boolean;
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
      {href ? (
        <Link
          href={href}
          onClick={onClick}
          className={cn(
            'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
            active || isActive
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
        </Link>
      ) : (
        <span
          className={cn(
            'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
            href && (active || isActive)
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
        </span>
      )}

      {active && (
        <div
          className='pt-1 absolute left-0  '
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
  const [hasThirdLevel, setHasThirdLevel] = useState<boolean>(false);

  if (items.length === 0 || items.length === 1) {
    return null;
  }

  useEffect(() => {
    if (items.some((item) => item.children && item.children.length > 0)) {
      setHasThirdLevel(true);
    }
  }, [items]);

  const currentActiveItem = activeItem
    ? items.find((item) => item.databaseId.toString() === activeItem)
    : null;

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
    <div className='p-2 shadow-lg rounded-md border bg-popover'>
      <div
        className={cn(
          'grid gap-0 border rounded-md',
          hasThirdLevel ? 'grid-cols-3 w-[600px]' : 'grid-cols-2 w-[400px]'
        )}
      >
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
                item.uri ? (
                  <Link
                    href={item.uri || ''}
                    className='w-full flex items-center justify-between'
                  >
                    <span>{item.label}</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                ) : (
                  <>
                    <span>{item.label}</span>
                    <ChevronRight className='h-4 w-4' />
                  </>
                )
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
            <div className='flex items-center justify-center h-full text-sm text-muted-foreground p-4 '>
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
        {hasThirdLevel && (
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
                      {currentActiveSubItem?.description ||
                        'Idite na kategoriju'}
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
        )}
      </div>
    </div>
  );
}
