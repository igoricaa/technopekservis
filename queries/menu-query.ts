import gql from 'graphql-tag';

export const getMenuQuery = gql`
  query getMenu {
    menuItems(where: { location: PRIMARY_MENU }) {
      nodes {
        uri
        target
        label
      }
    }
  }
`;

// async function getData() {
//     const menuQuery = gql`
//       query MenuQuery {
//         menuItems(where: { location: PRIMARY_MENU }) {
//           nodes {
//             uri
//             target
//             label
//           }
//         }
//       }
//     `;

//     const { menuItems } = await fetchGraphQL<{
//       menuItems: RootQueryToMenuItemConnection;
//     }>(print(menuQuery));

//     if (menuItems === null) {
//       throw new Error("Failed to fetch data");
//     }

//     return menuItems;
//   }
