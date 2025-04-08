import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import heroImg from '@/public/techno-pek-servis-hero.webp';

const Hero = () => {
  return (
    <section className='flex flex-col justify-end relative w-screen h-[calc(100vh-440px)] lg:h-[50vh] px-side py-4 sm:py-8 lg:py-12 mt-18 sm:mt-20 lg:mt-28'>
      <Image
        src={heroImg}
        alt='Techno Pek Servis - Pekarska oprema'
        fill
        priority
        sizes='(max-width:640px) 640px, (max-width: 1024px) 1024px, 1920px'
        className='object-cover'
      />
      <div className='relative z-10 bg-black/70 px-2 sm:px-4 lg:px-6 py-4 rounded-lg max-w-2xl'>
        <h1 className='text-white text-5xl lg:text-6xl font-bold'>
          Pekarska oprema
        </h1>
        <p className='text-white text-sm sm:text-base lg:text-lg mt-2'>
          Najbolja pekarska oprema na tržištu. Najbolja pekarska oprema na
          tržištu. Najbolja pekarska oprema na tržištu. Najbolja pekarska oprema
          na tržištu.
        </p>
        <Link
          href='/pekarska-oprema'
          className={cn(buttonVariants({ size: 'lg' }), 'mt-6')}
        >
          Pogledaj ponudu
        </Link>
      </div>
    </section>
  );
};

export default Hero;
