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
      className='w-6 h-4.5 sm:w-8 sm:h-6.5 flex flex-col justify-center items-end gap-1.5 z-50 relative'
    >
      <span
        className={`block w-full h-0.5 sm:h-0.75 foreground transition-all duration-300 origin-center ${
          isOpen ? 'rotate-45 translate-y-2 sm:translate-y-[9px] bg-white' : 'bg-black'
        }`}
      />
      <span
        className={`block w-4 sm:w-6 h-0.5 sm:h-0.75 transition-all duration-300 ${
          isOpen ? 'scale-0 bg-white' : 'scale-100 bg-black'
        }`}
      />
      <span
        className={`block w-full h-0.5 sm:h-0.75 transition-all duration-300 origin-center ${
          isOpen ? '-rotate-45 -translate-y-2 sm:-translate-y-[9px] bg-white' : 'bg-black'
        }`}
      />
    </button>
  );
};

export default Burger;
