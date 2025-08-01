import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';

type CustomButtonProp = {
  icon?: string;
  onClick?: () => void;
  text: string;
  variant: 'outlined' | 'contained';
};

const CustomButton = ({ icon, onClick, text, variant }: CustomButtonProp) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'text-sm flex items-center gap-2 px-5 py-2  justify-center  rounded-xl font-semibold transition duration-300 w-[100px] sm:w-fit',
        {
          'bg-[#06A06F] text-white border border-transparent hover:bg-[#04825D]':
            variant === 'contained',
          'bg-transparent text-white border justify-center items-center  border-[#3B3B3B] hover:bg-[#262626] hover:border-[#04825D]':
            variant === 'outlined',
        }
      )}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          height={20}
          width={20}
          className="w-5 h-5"
        />
      )}
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
