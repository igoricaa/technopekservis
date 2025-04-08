import { MenuItem, Product } from '@/gql/graphql';

export interface ProductData {
  product: Product;
}

export interface MenuItemWithChildren extends MenuItem {
  children?: MenuItemWithChildren[];
}
