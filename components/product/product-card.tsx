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
        'col-span-2 lg:col-span-3 group px-4 py-6 shadow-md',
        className
      )}
      role='article'
      aria-label={`Product: ${productTitle}`}
    >
      <Link href={productLink} aria-label={`View details for ${productTitle}`}>
        <div className='relative w-full aspect-square overflow-hidden'>
          <Image
            src={productImage}
            alt={productTitle}
            fill
            sizes='25vw'
            className='object-cover group-hover:scale-110 transition-all duration-300'
            priority={false}
          />
        </div>

        <p className='uppercase text-gray-500'>{primaryCategory}</p>

        <h3 className='text-4xl font-bold'>{productTitle}</h3>
        <Button
          variant='textual'
          className='text-accent mt-1 group-hover:after:translate-x-0 group-hover:after:delay-300 group-hover:before:translate-x-full group-hover:before:delay-0'
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
    <div className='relative w-full aspect-square overflow-hidden bg-gray-200'>
      <div className={`absolute inset-0 shimmer`} />
    </div>
    <div className='h-4 w-24 bg-gray-200 rounded mt-4'>
      <div className={`shimmer`} />
    </div>
    <div className='h-8 w-3/4 bg-gray-200 rounded mt-2'>
      <div className={`shimmer`} />
    </div>
    <div className='h-6 w-32 bg-gray-200 rounded mt-4'>
      <div className={`shimmer`} />
    </div>
  </article>
);
