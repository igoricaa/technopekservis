import { cn } from '@/lib/utils';
import Image from 'next/image';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('relative w-20 aspect-[250/203]', className)}>
      <Image
        src='/techno-pek-servis-logo.webp'
        alt='Techno Pek Servis'
        fill
        sizes='250px'
        className='object-cover'
      />
    </div>
  );
};

export default Logo;
