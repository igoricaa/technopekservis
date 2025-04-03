import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export const ProductCard = ({
  productTitle,
  productImage,
  primaryCategory,
  productLink,
  className,
}: {
  productTitle: string;
  productImage: string;
  primaryCategory: string;
  productLink: string;
  className?: string;
}) => {
  return (
    <Link
      href={productLink}
      aria-label={`View details for ${productTitle}`}
      className={cn('col-span-2 lg:col-span-3', className)}
    >
      <article
        className={cn('group px-4 py-6 shadow-md h-full flex flex-col')}
        role='article'
        aria-label={`Product: ${productTitle}`}
      >
        <div className='overflow-hidden'>
          <Image
            src={productImage}
            alt={productTitle}
            width={450}
            height={450}
            className='object-cover group-hover:scale-110 transition-all duration-300 aspect-square'
            priority={false}
          />
        </div>

        <p className='text-xs uppercase text-gray-500 mt-2'>
          {primaryCategory}
        </p>

        <h3 className='text-2xl font-bold'>{productTitle}</h3>
        <Button
          variant='textual'
          className='text-accent mt-auto group-hover:after:translate-x-0 group-hover:after:delay-300 group-hover:before:translate-x-full group-hover:before:delay-0'
          aria-label={`Saznaj više o ${productTitle}`}
        >
          Saznajte više
        </Button>
      </article>
    </Link>
  );
};

export const ProductCardSkeleton = () => (
  <article
    className='col-span-2 lg:col-span-3 group px-4 py-6 shadow-xl'
    role='article'
  >
    <div className='relative w-full aspect-square overflow-hidden shimmer'></div>
    <div className='h-4 w-24 mt-2 shimmer'></div>
    <div className='h-7 w-3/4 mt-2 shimmer'></div>
    <div className='h-6 w-32 mt-2 shimmer'></div>
  </article>
);
