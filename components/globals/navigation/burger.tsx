const Burger = ({
  handleClick,
  isOpen,
}: {
  handleClick: () => void;
  isOpen: boolean;
}) => {
  return (
    <button
      onClick={handleClick}
      className='w-8 h-6 sm:w-10 sm:h-8 flex flex-col justify-center items-end gap-[6px]'
    >
      <span
        className={`block w-full h-[3px] sm:h-1 bg-foreground transition-all duration-300 origin-center ${
          isOpen ? 'rotate-45 translate-y-[9px] ' : ''
        }`}
      />
      <span
        className={`block w-6 sm:w-8 h-[3px] sm:h-1 bg-foreground transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      />
      <span
        className={`block w-full h-[3px] sm:h-1 bg-foreground transition-all duration-300 origin-center ${
          isOpen ? '-rotate-45 -translate-y-[9px]' : ''
        }`}
      />
    </button>
  );
};

export default Burger;
