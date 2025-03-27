import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section className='relative w-screen h-[50vh] px-side py-12 flex flex-col justify-end'>
      <Image
        src='/technopek-servis-hero.webp'
        alt='Technopek Servis - pekarska oprema'
        fill
        priority
        sizes='100vw'
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
          href='/ponuda'
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
