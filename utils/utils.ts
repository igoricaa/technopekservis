import { ProductCategory } from '@/gql/graphql';

export const getCategoryHierarchy = (
  primaryCategory: ProductCategory
): { categoryHierarchyPath: string; categoryHierarchyNames: string } => {
  if (!primaryCategory)
    return { categoryHierarchyPath: '', categoryHierarchyNames: '' };
  if (!primaryCategory.ancestors)
    return {
      categoryHierarchyPath: primaryCategory.slug as string,
      categoryHierarchyNames: primaryCategory.name as string,
    };

  const categoriesSlugs = primaryCategory.ancestors.nodes.map(
    (ancestor: any) => ancestor.slug
  );

  const categoriesNames = primaryCategory.ancestors.nodes.map(
    (ancestor: any) => ancestor.name
  );

  const categoryHierarchyPath = [
    ...categoriesSlugs.reverse(),
    primaryCategory.slug,
  ].join('/');

  const categoryHierarchyNames = [
    ...categoriesNames.reverse(),
    primaryCategory.name,
  ].join(' / ');

  return { categoryHierarchyPath, categoryHierarchyNames };
};

export const sortCategoriesByChildren = (categories: ProductCategory[]) => {
  return [...categories].sort((a, b) => {
    const aHasChildren = a.children?.nodes && a.children.nodes.length > 0;
    const bHasChildren = b.children?.nodes && b.children.nodes.length > 0;
    if (aHasChildren === bHasChildren) return 0;
    return aHasChildren ? -1 : 1;
  });
};
