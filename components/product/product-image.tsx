import Image from 'next/image';

interface ProductImageProps {
  src?: string;
  alt?: string | null;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  if (!src) return null;

  return (
    <div className='relative aspect-square'>
      <Image
        src={src}
        alt={alt || ''}
        fill
        className='object-cover rounded-lg'
        sizes='(max-width: 640px) 640px, (max-width: 1024px) 1024px , 650px'
        priority
      />
    </div>
  );
}
