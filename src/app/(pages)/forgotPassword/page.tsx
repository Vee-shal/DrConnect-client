"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEnvelope } from "react-icons/fa";
import { Forgotschema } from "@/app/lib/validations/forgotPasswordSchema";



type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: yupResolver(Forgotschema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Sending password reset to:", data.email);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#08231B] to-[#081511] px-4">
      <div className="bg-white/5 backdrop-blur-md border border-green-600 rounded-2xl p-6 w-full max-w-md text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <label className="text-sm mb-1 block">Email</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-3 py-2">
              <FaEnvelope className="mr-2 text-green-400" />
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 transition-all py-2 px-4 rounded-md font-medium"
          >
            Send Reset Link
          </button>

          {isSubmitSuccessful && (
            <p className="text-green-400 text-sm mt-3 text-center">
              If an account with that email exists, a reset link has been sent.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
