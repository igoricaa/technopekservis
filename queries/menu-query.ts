import { MenuItem, RootQueryToMenuItemConnection } from '@/gql/graphql';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

export async function getMenuItems(): Promise<MenuItem[]> {
  const { menuItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
  }>(print(getMenuQuery));

  if (menuItems === null) {
    throw new Error('Failed to fetch data');
  }

  return menuItems.nodes;
}

export const getMenuQuery = gql`
  query getMenu {
    menuItems(where: { location: PRIMARY_MENU }, first: 100) {
      nodes {
        databaseId
        uri
        label
        parentDatabaseId
      }
    }
  }
`;
