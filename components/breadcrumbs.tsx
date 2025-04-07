import { cn } from '@/lib/utils';
import Link from 'next/link';

const Breadcrumbs = ({
  items,
  className,
}: {
  items: { label: string; href: string }[];
  className?: string;
}) => {
  return (
    <nav
      className={cn(
        'flex flex-wrap gap-1 sm:gap-2 items-center pl-side lg:pl-28 mt-4',
        className
      )}
    >
      {items.map((item, index) => (
        <p
          key={index}
          className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap'
        >
          {index === items.length - 1 ? (
            <span>{item.label}</span>
          ) : (
            <>
              <Link href={item.href} className=''>
                {item.label}
              </Link>{' '}
              {index !== items.length - 1 && '| '}
            </>
          )}
        </p>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
