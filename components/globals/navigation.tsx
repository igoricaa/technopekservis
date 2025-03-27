import Link from 'next/link';
import { print } from 'graphql/language/printer';
import { MenuItem, RootQueryToMenuItemConnection } from '@/gql/graphql';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { getMenuQuery } from '@/queries/menu-query';

async function getData() {
  const { menuItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
  }>(print(getMenuQuery));

  if (menuItems === null) {
    throw new Error('Failed to fetch data');
  }

  return menuItems;
}

export default async function Navigation() {
  const menuItems = await getData();

  return (
    <nav
      className=''
      role='navigation'
      itemScope
      itemType='http://schema.org/SiteNavigationElement'
    >
      {menuItems.nodes.map((item: MenuItem, index: number) => {
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
