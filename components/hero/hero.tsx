import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import heroImg from '@/public/techno-pek-servis-hero.webp';

const Hero = () => {
  return (
    <section className='relative w-screen h-[60vh] px-side py-12 flex flex-col justify-end'>
      <Image
        src={heroImg}
        alt='Techno Pek Servis - Pekarska oprema'
        fill
        priority
        sizes='(max-width:640px) 640px, (max-width: 1024px) 1024px, 1920px'
        className='object-cover'
      />
      <div className='relative z-10 bg-black/70 px-6 py-4 rounded-lg max-w-2xl'>
        <h1 className='text-white text-6xl font-bold'>Pekarska oprema</h1>
        <p className='text-white text-lg mt-2'>
          Najbolja pekarska oprema na tržištu. Najbolja pekarska oprema na
          tržištu. Najbolja pekarska oprema na tržištu. Najbolja pekarska oprema
          na tržištu.
        </p>
        <Link
          href='/pekarska-oprema'
          // className='text-white text-lg mt-2 bg-primary px-4 py-2 rounded-lg'
          className={cn(buttonVariants({ size: 'lg' }), 'mt-6')}
        >
          Pogledaj ponudu
        </Link>
      </div>
    </section>
  );
};

export default Hero;
