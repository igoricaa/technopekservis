import { cn } from '@/lib/utils';

const GoogleMap = ({ className }: { className?: string }) => {
  return (
    <iframe
      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.1623465777498!2d20.36372407663342!3d44.85898967361487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a676405f837c3%3A0xb128603f94cbf43b!2sTECHNO%20PEK%20SERVIS%20BEOGRAD!5e0!3m2!1sen!2snl!4v1682516263639!5m2!1sen!2snl'
      width='100%'
      height='400'
      className={cn(
        className,
        'grayscale hover:grayscale-0 transition-all duration-300'
      )}
    ></iframe>
  );
};

export default GoogleMap;
