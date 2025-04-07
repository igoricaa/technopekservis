import { Product, ProductCategory } from '@/gql/graphql';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { ProductGrid } from '../product/product-grid';
import { sortCategoriesByChildren } from '@/utils/utils';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ShopServer = ({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) => {
  return (
    <>
      <div className='bg-gray-200 rounded-md px-4 py-4 sm:w-xs h-fit lg:sticky top-30'>
        <p className='text-xl sm:text-2xl font-bold'>Proizvodi</p>
        <Link
          href='/pekarska-oprema'
          className={cn(
            buttonVariants({ variant: 'filter' }),
            'mt-4 font-medium text-sm sm:text-base'
          )}
        >
          Svi proizvodi
        </Link>
        <Accordion type='multiple'>
          {categories.map((category: ProductCategory) => (
            <ProductCategoryAccordion
              key={category.slug || category.id}
              category={category}
            />
          ))}
        </Accordion>
      </div>

      <section className='w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4'>
        <ProductGrid products={products} />
      </section>
    </>
  );
};

export default ShopServer;

const ProductCategoryAccordion = ({
  category,
  hasParent = false,
}: {
  category: ProductCategory;
  hasParent?: boolean;
}) => {
  const hasChildren =
    category.children?.nodes && category.children.nodes.length > 0;

  const parent = category.parent?.node;
  const categoryPath =
    parent && parent.parent
      ? `/pekarska-oprema/${parent.slug}/${category.slug}`
      : `/pekarska-oprema/${category.slug}`;

  if (!hasChildren) {
    return (
      <Link
        href={categoryPath}
        className={cn(
          buttonVariants({ variant: 'filter' }),
          `${!hasParent ? 'mt-2' : ''}`,
          '!ml-4 text-sm sm:text-base'
        )}
      >
        {category.name}
      </Link>
    );
  }

  const sortedChildren = sortCategoriesByChildren(
    category.children?.nodes || []
  );

  return (
    <AccordionItem
      value={category.slug || category.id}
      className='py-2 border-b border-black/50'
    >
      <AccordionTrigger className='!px-0 !py-0 !h-auto text-primary text-sm sm:text-base rounded-none w-fit hover:no-underline font-open-sans cursor-pointer'>
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
                key={childCategory.slug || childCategory.id}
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
