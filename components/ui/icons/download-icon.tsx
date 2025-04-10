const DownloadIcon: React.FC<React.SVGProps<SVGElement>> = ({
  className,
  color = 'currentColor',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    stroke={color}
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    className={className}
    viewBox='0 0 24 24'
  >
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3'></path>
  </svg>
);

export default DownloadIcon;
