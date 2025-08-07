'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { otpSchema } from '@/app/lib/validations/otpVerificationSchema';
import { Forgotschema } from '@/app/lib/validations/forgotPasswordSchema';
import { _makePostRequest } from '@/app/lib/api/api';
import { endpoints } from '@/app/lib/api/endpoints';
import toast from 'react-hot-toast';
import { resetPasswordSchema } from '@/app/lib/validations/resetPasswordSchema';
import { useRouter } from 'next/navigation';
import CustomLoader from '@/app/components/Custom_UI/CustomLoader';
import { useAuthStore } from '@/app/lib/store/authStore';

type EmailFormData = {
  email: string;
};

type OTPFormData = yup.InferType<typeof otpSchema>;

type ResetPasswordData = yup.InferType<typeof resetPasswordSchema>;

enum Step {
  EMAIL = 1,
  OTP = 2,
  RESET = 3,
}

const ForgotPasswordWithOTP = () => {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [step, setStep] = useState<Step>(Step.EMAIL);
  const [email, setEmail] = useState('');

  // Step 1: Email
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    reset: resetEmailForm,
  } = useForm<EmailFormData>({
    resolver: yupResolver(Forgotschema),
  });

  // Step 2: OTP
  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OTPFormData>({
    resolver: yupResolver(otpSchema),
  });

  // Step 3: Reset Password
  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    reset: resetResetForm,
  } = useForm<ResetPasswordData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onEmailSubmit = async (data: EmailFormData) => {
    const res = await _makePostRequest(endpoints.AUTH.FORGOT_PASSWORD, {
      email: data.email,
    });

    if (res.status === 200) {
      setStep(Step.OTP);
      setEmail(data.email);
      toast.success('OTP has been sent to your email');
    } else {
      toast.error('Something went wrong');
    }
    resetEmailForm();
  };

  const onOTPSubmit = async (data: OTPFormData) => {
    const res = await _makePostRequest(endpoints.AUTH.VERIFY_OTP, {
      otp: data.otp,
      email,
    });

    if (res.status === 200) {
      toast.success('OTP verified successfully');
      setStep(Step.RESET);
    } else {
      toast.error('Invalid OTP');
    }
  };

  const onResetSubmit = async (data: ResetPasswordData) => {
    const res = await _makePostRequest(endpoints.AUTH.RESET_PASSWORD, {
      email,
      newPassword: data.password,
    });

    if (res.status === 200) {
      toast.success('Password has been reset successfully');
      toast.success('You can login now');
      router.push("/Login");
    } else {
      toast.error('Failed to reset password');
    }
    resetResetForm();
  };
 
 useEffect(() => {
const token = useAuthStore((state)=>state.token);
  if (token) {
      router.replace('/');
    } else {
      setIsAuthChecked(true); // only render children after auth check
    }
  }, []);

    if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <CustomLoader/>
      </div>
    );
  }
  return (
  <div className="min-h-screen container flex items-center justify-center bg-[#111111] px-4 py-10">
  <div className="w-full md:max-w-4xl flex flex-col md:flex-row bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl overflow-hidden shadow-2xl shadow-[#00c37a]/10">
    {/* Left Image */}
    <div className="hidden md:flex w-1/2 bg-black items-center justify-center p-8">
      <Image
        src="/banner2.webp"
        alt="Visual"
        width={500}
        height={500}
        className="object-contain rounded-lg"
      />
    </div>

    {/* Right Form */}
    <div className="w-full md:w-1/2 p-8">
      <div className="max-w-md w-full mx-auto text-white">
        {/* Logo & Heading */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center">
            <div className="p-3 bg-[#00c37a]/10 border border-[#00c37a]/20 rounded-full">
              <FaLock className="text-3xl text-[#00c37a]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">
            {step === Step.EMAIL
              ? 'Forgot Password'
              : step === Step.OTP
              ? 'OTP Verification'
              : 'Reset Password'}
          </h2>
          <p className="text-[#00c37a] text-sm">
            {step === Step.EMAIL
              ? 'Enter your email to receive a reset link'
              : step === Step.OTP
              ? 'Check your email for the verification code'
              : 'Create a new password for your account'}
          </p>
        </div>

        {/* Step 1: Email Form */}
        {step === Step.EMAIL && (
          <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-[#00c37a]/70" />
                <input
                  type="email"
                  {...registerEmail('email')}
                  placeholder="doctor@example.com"
                  className={`w-full pl-10 pr-3 py-3 bg-[#1a1a1a] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    emailErrors.email ? 'border-red-500 ring-red-400' : 'border-[#08392e] focus:ring-[#00c37a]/50'
                  }`}
                />
              </div>
              {emailErrors.email && (
                <p className="text-red-500 text-xs mt-1">{emailErrors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Send OTP
              <svg
                className="ml-2 -mr-1 w-4 h-4 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
              </svg>
            </button>
          </form>
        )}

        {/* Step 2: OTP Form */}
        {step === Step.OTP && (
          <form onSubmit={handleOtpSubmit(onOTPSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Verification Code</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  {...registerOtp('otp')}
                  placeholder="Enter 6-digit code"
                  className={`w-full px-4 py-3 bg-[#1a1a1a] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    otpErrors.otp ? 'border-red-500 ring-red-400' : 'border-[#08392e] focus:ring-[#00c37a]/50'
                  }`}
                />
              </div>
              {otpErrors.otp && (
                <p className="text-red-500 text-xs mt-1">{otpErrors.otp.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Verify Code
              <svg
                className="ml-2 -mr-1 w-4 h-4 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </form>
        )}

        {/* Step 3: Reset Password Form */}
        {step === Step.RESET && (
          <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">New Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-[#00c37a]/70" />
                <input
                  type="password"
                  {...registerReset('password')}
                  placeholder="Enter new password"
                  className={`w-full pl-10 pr-3 py-3 bg-[#1a1a1a] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    resetErrors.password ? 'border-red-500 ring-red-400' : 'border-[#08392e] focus:ring-[#00c37a]/50'
                  }`}
                />
              </div>
              {resetErrors.password && (
                <p className="text-red-500 text-xs mt-1">{resetErrors.password.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-[#00c37a]/70" />
                <input
                  type="password"
                  {...registerReset('confirmPassword')}
                  placeholder="Confirm new password"
                  className={`w-full pl-10 pr-3 py-3 bg-[#1a1a1a] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    resetErrors.confirmPassword ? 'border-red-500 ring-red-400' : 'border-[#08392e] focus:ring-[#00c37a]/50'
                  }`}
                />
              </div>
              {resetErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{resetErrors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Reset Password
              <svg
                className="ml-2 -mr-1 w-4 h-4 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </form>
        )}

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <a
            href="/Login"
            className="inline-flex items-center text-sm text-[#00c37a] hover:underline"
          >
            <svg
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ForgotPasswordWithOTP;
