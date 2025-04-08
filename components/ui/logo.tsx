import { cn } from '@/lib/utils';
import Image from 'next/image';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src='/techno-pek-servis-logo.webp'
      alt='Techno Pek Servis'
      width={250}
      height={203}
      className={cn('w-20 aspect-[250/203] object-cover', className)}
    />
  );
};

export default Logo;
