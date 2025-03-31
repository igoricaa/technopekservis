import { ProductGridSection } from '@/components/product/product-grid';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Product, ProductCategory } from '@/gql/graphql';
import { cn } from '@/lib/utils';
import { getProductsAndCategoriesQuery } from '@/queries/product-queries';
import { fetchGraphQL } from '@/utils/fetch-graphql';
import { sortCategoriesByChildren } from '@/utils/utils';
import { print } from 'graphql';

interface GetProductsAndCategoriesResponse {
  products: {
    nodes: Product[];
  };
  productCategories: {
    edges: {
      node: ProductCategory;
    }[];
  };
}

const getProductsAndCategories = async () => {
  const productsAndCategories =
    await fetchGraphQL<GetProductsAndCategoriesResponse>(
      print(getProductsAndCategoriesQuery)
    );

  return productsAndCategories;
};

const ShopPage = async () => {
  // TODO: remove edges
  // TODO: add pagination
  const productsAndCategories = await getProductsAndCategories();
  const products = productsAndCategories.products.nodes;
  const productCategories = productsAndCategories.productCategories.edges;
  const mainCategory = productCategories[0].node;

  console.log('mainCategory: ', mainCategory);

  const sortedCategories = sortCategoriesByChildren(
    mainCategory.children?.nodes || []
  );

  return (
    <main className='container mx-auto py-40'>
      <h1 className='text-5xl font-bold mb-16'>Shop</h1>
      <section className='flex gap-4'>
        <div className='bg-gray-200 rounded-md px-4 py-4 w-xs h-fit sticky top-30'>
          <p className='text-2xl font-bold'>Proizvodi</p>
          <Accordion
            type='multiple'
            className='mt-2'
            // defaultValue={['categories', 'price', 'color', 'size', 'brand']}
          >
            {sortedCategories.map((category: ProductCategory) => (
              <ProductCategoryAccordion
                key={category.slug}
                category={category}
              />
            ))}
          </Accordion>
        </div>
        <ProductGridSection className='w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4' />
      </section>
    </main>
  );
};

export default ShopPage;

const ProductCategoryAccordion = ({
  category,
  hasParent = false,
}: {
  category: ProductCategory;
  hasParent?: boolean;
}) => {
  const hasChildren =
    category.children?.nodes && category.children.nodes.length > 0;

  if (!hasChildren) {
    return (
      <Button
        variant='filter'
        className={cn(`${!hasParent ? 'mt-2' : ''}`, '!ml-4')}
      >
        {category.name}
      </Button>
    );
  }

  const sortedChildren = sortCategoriesByChildren(
    category.children?.nodes || []
  );

  return (
    <AccordionItem
      value={category.slug || category.name || 'category'}
      className='py-2 border-b border-black/50'
    >
      <AccordionTrigger className='!px-0 !py-0 !h-auto text-primary text-base rounded-none w-fit hover:no-underline font-open-sans cursor-pointer'>
        {category.name}
      </AccordionTrigger>
      <AccordionContent className='mt-2'>
        {category.children && (
          <Accordion
            type='multiple'
            className='flex flex-col items-start space-y-2'
          >
            {sortedChildren.map((childCategory: ProductCategory) => (
              <ProductCategoryAccordion
                key={
                  childCategory.slug || childCategory.name || childCategory.id
                }
                category={childCategory}
                hasParent={true}
              />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
