'use client';

import { Product, ProductCategory } from '@/gql/graphql';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { ProductGrid } from '../product/product-grid';
import { sortCategoriesByChildren } from '@/utils/utils';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ShopClient = ({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.productCategories?.edges?.some(
          (category: any) => category && category.node.slug === selectedCategory
        )
      )
    : products;

  return (
    <>
      <div className='bg-gray-200 rounded-md px-4 py-4 w-xs h-fit sticky top-30'>
        <p className='text-2xl font-bold'>Proizvodi</p>
        <Button
          variant='filter'
          className={cn('mt-4 font-medium')}
          onClick={() => setSelectedCategory(null)}
        >
          Svi proizvodi
        </Button>
        <Accordion type='multiple'>
          {categories.map((category: ProductCategory) => (
            <ProductCategoryAccordion
              key={category.slug || category.id}
              category={category}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          ))}
        </Accordion>
      </div>

      <section className='w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4'>
        <ProductGrid products={filteredProducts} />
      </section>
    </>
  );
};

export default ShopClient;

const ProductCategoryAccordion = ({
  category,
  hasParent = false,
  selectedCategory,
  onSelectCategory,
}: {
  category: ProductCategory;
  hasParent?: boolean;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}) => {
  const hasChildren =
    category.children?.nodes && category.children.nodes.length > 0;

  if (!hasChildren) {
    return (
      <Button
        variant='filter'
        className={cn(
          `${!hasParent ? 'mt-2' : ''}`,
          '!ml-4',
          selectedCategory === category.slug && 'bg-primary text-white'
        )}
        onClick={() => category.slug && onSelectCategory(category.slug)}
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
      value={category.slug || category.id}
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
                key={childCategory.slug || childCategory.id}
                category={childCategory}
                hasParent={true}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
              />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
