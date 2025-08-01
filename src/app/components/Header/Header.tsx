'use client';

import { navLinks } from '@/app/utils/data';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import CustomButton from '../Custom_UI/CustomButton';

const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[var(--primary)] text-white border-b border-accent ">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-light">
          DrConnect
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 md:items-center">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-2">
          <CustomButton text="Login" onClick={() => {}} />
          <CustomButton text="Sign up" onClick={() => {}} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--primary)] px-4 pb-4 space-y-4">
          {navLinks.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer hover:text-accent transition-colors"
              onClick={() => {
                router.push(item.href);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.name}
            </div>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <CustomButton text="Login" onClick={() => {}} />
            <CustomButton text="Sign up" onClick={() => {}} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
