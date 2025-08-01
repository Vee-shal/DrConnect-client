'use client';

import { navLinks } from '@/app/utils/data';
import { useRouter } from 'next/navigation';
import React from 'react';
import CustomButton from '../Custom_UI/CustomButton';

const Header = () => {
  const router = useRouter();

  return (
    <header className="container bg-[var(--primary)] flex items-center justify-between py-4 px-6 bg-primary text-white border-b border-accent">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wide text-light">
        DrConnect
      </div>

      {/* Navigation Links */}
      <nav className="space-x-6">
        {navLinks.map((item, index) => (
          <span
            key={index}
            className="cursor-pointer hover:text-accent transition-colors"
            onClick={() => router.push(item.href)}
          >
            {item.name}
          </span>
        ))}
      </nav>

      {/* Right-side Button */}
      <div className="flex gap-2">
        <CustomButton text="Login" onClick={() => {}} />
        <CustomButton text="Sign up" onClick={() => {}} />
      </div>
    </header>
  );
};

export default Header;
