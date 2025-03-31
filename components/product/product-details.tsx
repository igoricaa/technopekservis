import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import DownloadIcon from '../ui/icons/download-icon';

interface ProductDetailsProps {
  title: string;
  category: string;
  advantages?: string | null;
  characteristics?: string | null;
  pdfUri?: string | null;
}

export function ProductDetails({
  title,
  category,
  advantages,
  characteristics,
  pdfUri,
}: ProductDetailsProps) {
  return (
    <div>
      <h1 className='text-6xl font-semibold'>{title}</h1>
      <h2 className='text-2xl font-semibold'>{category}</h2>
      {advantages && (
        <div className='max-w-none mt-6 space-y-2'>
          <h3 className='text-3xl font-medium'>Prednosti</h3>
          <div
            dangerouslySetInnerHTML={{ __html: advantages }}
            className='product-desc'
          />
        </div>
      )}

      {characteristics && (
        <div className='max-w-none mt-6 space-y-2'>
          <h3 className='text-3xl font-medium'>Karakteristike</h3>
          <div
            dangerouslySetInnerHTML={{ __html: characteristics }}
            className='product-desc'
          />
        </div>
      )}

      {pdfUri && (
        <div className='mt-4'>
          <Link
            href={pdfUri}
            className={cn(buttonVariants({ size: 'lg' }), 'mt-4')}
            target='_blank'
            rel='noopener noreferrer'
          >
            <DownloadIcon className='w-5 h-5' color='white' />
            Preuzmite list sa podacima
          </Link>
        </div>
      )}
    </div>
  );
}
