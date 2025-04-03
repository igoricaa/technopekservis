import Image from 'next/image';
import bannerBg from '@/public/techno-pek-servis-banner-bg.png';

const HeaderBanner = () => {
  return (
    <Image
      src={bannerBg}
      alt='Techno Pek Servis - O nama'
      className='object-cover'
    />
  );
};

export default HeaderBanner;
