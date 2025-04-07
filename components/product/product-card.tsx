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
    <article
      className={cn(
        'col-span-2 lg:col-span-3 group px-3 py-5 shadow-md bg-white',
        className
      )}
      role='article'
      aria-label={`Product: ${productTitle}`}
    >
      <Link
        href={productLink}
        aria-label={`View details for ${productTitle}`}
        className='flex flex-col h-full'
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

        <p className='text-xs uppercase text-gray-500 mt-2 line-clamp-2'>
          {primaryCategory}
        </p>

        <h3 className='text-2xl font-bold line-clamp-2'>{productTitle}</h3>
        <Button
          variant='textual'
          className='text-accent mt-auto grouped'
          aria-label={`Saznaj više o ${productTitle}`}
        >
          Saznajte više
        </Button>
      </Link>
    </article>
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
