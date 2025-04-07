import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const BrandCategoryCard = ({
  name,
  image,
  link,
  color,
  brandName,
}: {
  name: string;
  image: string;
  link: string;
  color: string;
  brandName: string;
}) => {
  return (
    <article className='rounded-lg p-4 w-full aspect-[285/350] relative group overflow-hidden'>
      <Link
        href={link}
        className='w-full h-full flex flex-col justify-center items-center'
      >
        <Image
          src={image}
          alt={`${brandName} - ${name}`}
          fill
          sizes='285px'
          className='object-cover opacity-50 group-hover:opacity-70 group-hover:scale-125 transition-all duration-300'
        />
        <span
          className='absolute left-0 top-8 w-11 h-7 [clip-path:polygon(0_0,100%_0,80%_100%,0%_100%)]'
          style={{ backgroundColor: color }}
        />
        <h3 className='text-white text-4xl font-bold text-center relative'>
          {name}
        </h3>
        <Button
          variant='secondary'
          size='lg'
          className={cn('absolute bottom-10 left-1/2 -translate-x-1/2')}
        >
          Pogledaj ponudu
        </Button>
      </Link>
    </article>
  );
};

export default BrandCategoryCard;
