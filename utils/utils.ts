import { ProductCategory } from '@/gql/graphql';

export const getCategoryHierarchySlugsAndNames = (
  primaryCategory: ProductCategory
): { slugs: string[]; names: string[] } => {
  if (!primaryCategory) {
    return { slugs: [], names: [] };
  }

  if (!primaryCategory.ancestors) {
    return {
      slugs: [primaryCategory.slug as string],
      names: [primaryCategory.name as string],
    };
  }

  const { slugs, names } = [
    primaryCategory,
    ...primaryCategory.ancestors.nodes,
  ].reduce(
    (acc, node: any) => ({
      slugs: [...acc.slugs, node.slug],
      names: [...acc.names, node.name],
    }),
    { slugs: [] as string[], names: [] as string[] }
  );

  return { slugs: slugs.reverse(), names: names.reverse() };
};

export const sortCategoriesByChildren = (categories: ProductCategory[]) => {
  return [...categories].sort((a, b) => {
    const aHasChildren = a.children?.nodes && a.children.nodes.length > 0;
    const bHasChildren = b.children?.nodes && b.children.nodes.length > 0;
    if (aHasChildren === bHasChildren) return 0;
    return aHasChildren ? -1 : 1;
  });
};
