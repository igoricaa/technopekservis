import { MenuItem } from '@/gql/graphql';
import { getMenuQuery } from '@/queries/menu-query';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { print } from 'graphql';
import NavMenu from './navigation-client';

interface MenuItemsResponse {
  nodes: MenuItem[];
}

async function getMenuItems(): Promise<MenuItem[]> {
  const { menuItems } = await fetchGraphQL<{
    menuItems: MenuItemsResponse;
  }>(print(getMenuQuery));

  if (menuItems === null) {
    throw new Error('Failed to fetch data');
  }

  return menuItems.nodes;
}

export default async function Navigation() {
  const menuItems = await getMenuItems();
  return <NavMenu menuItems={menuItems} />;
}
