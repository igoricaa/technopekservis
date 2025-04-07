import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

const CtaSection = ({ className }: { className?: string }) => {
  return (
    <section className={cn('bg-accent px-side py-16 sm:py-32', className)}>
      <div className='px-side py-10 lg:py-14 max-w-3xl mx-auto text-center bg-white rounded-xl'>
        <h2 className='text-5xl font-bold mb-10'>Imate pitanja?</h2>
        <p className='text-xl'>
          Ukoliko vam je potrebna pomoć, imate pitanja ili želite da zakažete
          posetu, slobodno nas kontaktirajte i rado ćemo Vam pomoći.
        </p>
        <Link
          href='/kontakt'
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'mt-6'
          )}
        >
          Kontaktirajte nas
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
