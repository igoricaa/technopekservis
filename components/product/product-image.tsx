import Image from 'next/image';

interface ProductImageProps {
  src?: string;
  alt?: string | null;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  if (!src) return null;

  // TODO: sredi
  return (
    // <div className='relative aspect-square'>
    <Image
      src={src}
      alt={alt || ''}
      // fill
      width={720}
      height={720}
      className='lg:w-full lg:h-full lg:max-w-[592px] object-cover rounded-lg'
      // sizes='(max-width: 640px) 640px, (max-width: 1024px) 1024px , 592px'
      priority
    />
    // </div>
  );
}
