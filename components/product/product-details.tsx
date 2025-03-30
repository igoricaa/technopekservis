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
          <div dangerouslySetInnerHTML={{ __html: advantages }} />
        </div>
      )}

      {characteristics && (
        <div className='max-w-none mt-6 space-y-2'>
          <h3 className='text-3xl font-medium'>Karakteristike</h3>
          <div dangerouslySetInnerHTML={{ __html: characteristics }} />
        </div>
      )}

      {pdfUri && (
        <div className='mt-4'>
          <a
            href={pdfUri}
            className='text-blue-600 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Preuzmi PDF
          </a>
        </div>
      )}
    </div>
  );
}
