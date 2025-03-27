import Link from 'next/link';
import { MenuItem } from '@/gql/graphql';
import { getMenuItems } from '@/queries/menu-query';

export default async function Navigation() {
  const menuItems = await getMenuItems();

  return (
    <nav
      className='flex items-center gap-6'
      role='navigation'
      itemScope
      itemType='http://schema.org/SiteNavigationElement'
    >
      {menuItems.map((item: MenuItem, index: number) => {
        if (!item.uri) return null;

        return (
          <Link
            itemProp='url'
            href={item.uri}
            key={index}
            target={item.target || '_self'}
          >
            <span itemProp='name'>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
