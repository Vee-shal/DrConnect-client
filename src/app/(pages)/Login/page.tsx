'use client';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserMd } from 'react-icons/fa';
import { _makePostRequest } from '@/app/lib/api/api';
import { endpoints } from '@/app/lib/api/endpoints';
import { LoginSchema } from '@/app/lib/validations/LoginSchema';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const res = await _makePostRequest(endpoints.AUTH.LOGIN, {
        ...data, verified: false
      });
      if (res?.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        toast.success("Login successful!");
        router.push("/profile");
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className="container flex items-center justify-center bg-[#111111] px-4 py-10">
      <div className="max-w-xl w-full bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl p-8 space-y-8 shadow-2xl shadow-[#00c37a]/10">
        {/* Logo & Heading */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-[#00c37a]/10 border border-[#00c37a]/20 rounded-full">
              <FaUserMd className="text-3xl text-[#00c37a]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-[#00c37a] text-sm">Access your medical dashboard and records</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3.5 text-[#00c37a]/70" />
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="doctor@example.com"
                className={`w-full pl-10 pr-3 py-3 bg-[#1a1a1a] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-400' : 'border-[#08392e] focus:ring-[#00c37a]/50'
                  }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3.5 text-[#00c37a]/70" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-10 py-3 bg-[#1a1a1a] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 ring-red-400' : 'border-[#08392e] focus:ring-[#00c37a]/50'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-3.5"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-[#00c37a]/70 hover:text-[#00c37a]" />
                ) : (
                  <FaEye className="text-[#00c37a]/70 hover:text-[#00c37a]" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-between items-center">

            <div onClick={()=>{
              router.push("/forgotPassword")
            }} className="text-xs cursor-pointer text-[#00c37a] hover:underline">
              Forgot Password?
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
          >
            {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
            </svg>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#08392e]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#111] text-gray-500">New to DrConnect?</span>
            </div>
          </div>

          {/* Register CTA */}
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
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
