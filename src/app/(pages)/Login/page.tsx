'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserMd } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic here
    console.log(formData);
    // router.push('/dashboard');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#111111]  px-4 py-10">
      <div className="max-w-md w-full bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl p-8 space-y-8 shadow-2xl shadow-[#00c37a]/10">
        {/* Logo and Heading */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-[#00c37a]/10 border border-[#00c37a]/20 rounded-full">
              <FaUserMd className="text-3xl text-[#00c37a]" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-[#00c37a] text-sm">
              Access your medical dashboard and records
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-[#00c37a]/70" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@example.com"
                className="block w-full pl-10 pr-3 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-[#00c37a]/70" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="block w-full pl-10 pr-10 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50 focus:border-transparent"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-[#00c37a]/70 hover:text-[#00c37a]" />
                ) : (
                  <FaEye className="h-5 w-5 text-[#00c37a]/70 hover:text-[#00c37a]" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#00c37a] bg-[#1a1a1a] border-[#08392e] rounded focus:ring-[#00c37a]"
              />
              Remember me
            </label>
            <a href="#" className="text-xs text-[#00c37a] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-[#00aa66] hover:to-[#00c37a] transition-all duration-200 flex items-center justify-center"
            >
              Login to Dashboard
              <svg
                className="ml-2 -mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#08392e]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#111] text-gray-500">New to DrConnect?</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <a
              href="/Signup"
              className="inline-flex items-center text-sm text-[#00c37a] hover:underline"
            >
              Create your professional account
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;