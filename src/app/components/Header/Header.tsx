'use client';

import { navLinks } from '@/app/utils/data';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import CustomButton from '../Custom_UI/CustomButton';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="container w-full bg-gradient-to-b from-[#08231B] to-[#081511] text-white border-b border-[#00C896] relative z-50">
      <div className=" mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-white">
          DrConnect
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 md:items-center">
          {navLinks.map((item, index) => (
            <span
              key={index}
              className="cursor-pointer hover:text-[#00C896] transition-colors"
              onClick={() => router.push(item.href)}
            >
              {item.name}
            </span>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-2">
          <CustomButton variant="contained" text="Login" onClick={() => {}} />
          <CustomButton variant="contained" text="Sign up" onClick={() => {}} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full border-b border-[#00C896] left-0 w-full bg-gradient-to-b from-[#08231B] to-[#081511] px-4 pb-6 pt-4 space-y-4 shadow-lg z-40"
          >
            {navLinks.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer hover:text-[#00C896] transition-colors"
                onClick={() => {
                  router.push(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <CustomButton variant="contained" text="Login" onClick={() => {}} />
              <CustomButton variant="contained" text="Sign up" onClick={() => {}} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
