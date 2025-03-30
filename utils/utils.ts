import { ProductCategory } from '@/gql/graphql';

export const getCategoryHierarchy = (primaryCategory: ProductCategory) => {
  if (!primaryCategory) return '';
  if (!primaryCategory.ancestors) return primaryCategory.slug;

  const categoriesSlugs = primaryCategory.ancestors.nodes.map(
    (ancestor: any) => ancestor.slug
  );

  const path = [...categoriesSlugs.reverse(), primaryCategory.slug].join('/');

  return path;
};
