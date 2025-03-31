import { cn } from '@/lib/utils';
import Image from 'next/image';

const InfiniteSlider = async ({
  data,
  className,
}: {
  data: any[];
  className?: string;
}) => {
  return (
    <section
      className={cn(
        'py-12 sm:py-20 lg:py-0 w-full overflow-hidden flex items-center justify-center bg-black ',
        className
      )}
    >
      <div
        className={cn(
          'flex justify-center items-center gap-16 sm:gap-20 lg:gap-28 w-fit h-80 animate-slide hover:pause-animation [&:hover>*]:opacity-30 [&>*:hover]:opacity-100'
        )}
      >
        {[...data, ...data, ...data, ...data, ...data, ...data, ...data].map(
          (item, index) => (
            <div
              key={`slide${index}`}
              className={cn(
                'relative w-32 sm:w-40 lg:w-40 h-24 transition-all duration-500 grayscale hover:grayscale-0'
              )}
            >
              <Image
                src={`/clients${item.image}`}
                alt={item.name}
                fill
                sizes='(max-width: 480px) 120px, (max-width: 1024px) 170px, 200px'
                className='object-contain'
              />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default InfiniteSlider;
