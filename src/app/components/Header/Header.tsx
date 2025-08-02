'use client';

import { navLinks } from '@/app/utils/data';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CustomButton from '../Custom_UI/CustomButton';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-[#08231B]/90 to-[#081511]/90 backdrop-blur-md border-b border-[#00C896]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div
          className="text-2xl  font-bold tracking-wide text-white cursor-pointer"
          onClick={() => router.push('/')}
        >
          DrConnect
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-white">
          {navLinks.map((item, index) => (
            <span
              key={index}
              className="text-sm cursor-pointer hover:text-[#00C896] transition-colors"
              onClick={() => router.push(item.href)}
            >
              {item.name}
            </span>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 ">
          <CustomButton variant="contained" text="Login" onClick={() => router.push('/Login')} />
          <CustomButton variant="contained" text="Sign up" onClick={() => router.push('/Signup')} />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#08231B] to-[#081511] px-4 pt-4 pb-6 border-b border-[#00C896] z-40 rounded-b-xl shadow-lg "
          >
            <div className="space-y-3 text-white">
              {navLinks.map((item, index) => (
                <div
                  key={index}
                  className="text-sm py-2 px-3 rounded hover:bg-[#00c37a]/10 transition hover:text-[#00C896] cursor-pointer"
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* Mobile Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-center gap-3 mt-5">
              <CustomButton
                variant="contained"
                text="Login"
                onClick={() => {
                  router.push('/Login');
                  setIsMobileMenuOpen(false);
                }}
              />
              <CustomButton
                variant="contained"
                text="Sign up"
                onClick={() => {
                  router.push('/Signup');
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
