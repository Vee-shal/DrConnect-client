'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { navLinks } from '@/app/utils/data';
import CustomButton from '../Custom_UI/CustomButton';

const Header = () => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Load user from localStorage once on client
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (token && userString) {
      try {
        setUser(JSON.parse(userString));
      } catch (e) {
        console.error('Invalid user JSON');
      }
    }
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const handleNavigation = useCallback((href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/Login');
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  return (
    <header className="sticky container top-0 z-50 bg-gradient-to-b from-[#08231B]/90 to-[#081511]/90 backdrop-blur-md border-b border-[#00C896]">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <div
          className="text-2xl font-bold tracking-wide text-white cursor-pointer"
          onClick={() => router.push('/')}
        >
          DrConnect
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-white">
          {navLinks.map(({ name, href }, index) => (
            <span
              key={index}
              className="text-sm cursor-pointer hover:text-[#00C896] transition-colors"
              onClick={() => handleNavigation(href)}
            >
              {name}
            </span>
          ))}
        </nav>

        {/* Auth Section for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={goToProfile}
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A8.962 8.962 0 0112 15c2.21 0 4.21.804 5.879 2.121M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <CustomButton
                text="Logout"
                variant="outlined"
                onClick={handleLogout}
              />
            </>
          ) : (
            <CustomButton
              text="Login"
              variant="contained"
              onClick={() => router.push('/Login')}
            />
          )}
        </div>

        {/* Mobile Section: Profile Icon + Hamburger */}
        <div className="md:hidden flex items-center gap-3 z-50">
          {user && (
            <button
              onClick={goToProfile}
              className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A8.962 8.962 0 0112 15c2.21 0 4.21.804 5.879 2.121M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
          <button className="text-white" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
            className="md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#08231B] to-[#081511] px-4 pt-4 pb-6 border-b border-[#00C896] z-40 rounded-b-xl shadow-lg"
          >
            <div className="space-y-3 text-white">
              {navLinks.map(({ name, href }, index) => (
                <div
                  key={index}
                  className="text-sm py-2 px-3 rounded hover:bg-[#00c37a]/10 transition hover:text-[#00C896] cursor-pointer"
                  onClick={() => handleNavigation(href)}
                >
                  {name}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-center gap-3 mt-5">
              {user ? (
                <CustomButton
                  text="Logout"
                  variant="contained"
                  onClick={handleLogout}
                />
              ) : (
                <>
                  <CustomButton
                    text="Login"
                    variant="contained"
                    onClick={() => handleNavigation('/Login')}
                  />
                  <CustomButton
                    text="Sign up"
                    variant="contained"
                    onClick={() => handleNavigation('/Signup')}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
