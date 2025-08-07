/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { _makePostRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import toast from "react-hot-toast";
import { profileSchema } from "@/app/lib/validations/ProfileSchema";
import { useAuthStore } from "@/app/lib/store/authStore";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
const user = useAuthStore((state)=>state.user);
const token = useAuthStore((state)=>state.token);


    if (!user || !token) {
      router.push("/Login");
      return;
    }

    setUser(user);
    setToken(token);
    setMounted(true);
  }, [router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await _makePostRequest(endpoints.PROFILE.UPDATE, {
        ...data,
        email: user.email,
      });

      if (res.status === 200) {
        reset();
        toast.success("Your profile was updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (!mounted || !user) return null;

  return (
    <section className="container mx-auto flex items-center justify-center bg-[#111111] px-4 py-10 min-h-screen">
      <div className="w-full max-w-6xl bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl p-8 space-y-8 shadow-2xl shadow-[#00c37a]/10">
        {user?.role === "doctor" && user?.verified && (
          <div className="flex justify-end">
            <span className="bg-green-900/80 px-3 py-1 rounded-full text-xs font-medium text-green-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Verified Medical Professional
            </span>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-[#00c37a]/10 border border-[#00c37a]/20 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-[#00c37a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Account Profile</h2>
            <p className="text-[#00c37a] text-sm mt-1">
              Manage your professional information and settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          {/* LEFT SIDE: Personal Info */}
          <div className="space-y-6">
            <div className="pb-2 border-b border-[#08392e]/50">
              <h3 className="text-lg font-semibold text-white">
                Personal Information
              </h3>
            </div>

            {[
              { label: "Full Name", value: user?.name, id: "name" },
              { label: "Email Address", value: user?.email, id: "email" },
              { label: "Phone Number", value: user?.phone_number, id: "phone" },
              {
                label: "Account Type",
                value:
                  user?.role === "user" ? "Patient" : "Medical Professional",
                id: "role",
              },
              ...(user?.role === "doctor"
                ? [
                    {
                      label: "Specialization",
                      value: user?.specialization,
                      id: "specialization",
                    },
                    {
                      label: "Years of Experience",
                      value: user?.experience,
                      id: "experience",
                    },
                    {
                      label: "License Number",
                      value: user?.license,
                      id: "license",
                    },
                  ]
                : []),
            ].map(({ label, value, id }) => (
              <div className="space-y-1" key={id}>
                <label
                  htmlFor={id}
                  className="block text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {label}
                </label>
                <input
                  type="text"
                  id={id}
                  value={value}
                  readOnly
                  className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#08392e] rounded-md text-sm text-gray-200 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between space-y-8 bg-[#0f0f0f] p-6 rounded-xl border border-[#08392e]/40 shadow-md">
            {user?.role === "doctor" && user?.verified ? (
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

  {/* Section Heading */}
  <div className="border-b border-[#00c37a]/30 pb-3">
    <h2 className="text-2xl font-semibold text-white tracking-wide">
      Practice Information
    </h2>
    <p className="text-sm text-gray-400">
      Update your clinic details and consultation fees.
    </p>
  </div>

  {/* Clinic Name */}
  <div className="space-y-2">
    <label htmlFor="clinicName" className="text-sm text-white font-medium">
      Clinic/Hospital Name
    </label>
    <input
      id="clinicName"
      type="text"
      {...register("clinicName")}
      placeholder="e.g. MedLife Clinic"
      className="w-full  text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00c37a]"
    />
    {errors.clinicName && (
      <p className="text-sm text-red-500">{errors.clinicName.message as string}</p>
    )}
  </div>

  {/* Clinic Address */}
  <div className="space-y-2">
    <label htmlFor="clinicAddress" className="text-sm text-white font-medium">
      Clinic Address
    </label>
    <input
      id="clinicAddress"
      type="text"
      {...register("clinicAddress")}
      placeholder="e.g. 123 MG Road, Udaipur"
      className="w-full  text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00c37a]"
    />
    {errors.clinicAddress && (
      <p className="text-sm text-red-500">{errors.clinicAddress.message as string}</p>
    )}
  </div>

  {/* Fees Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* In-Person Fee */}
    <div className="space-y-2">
      <label htmlFor="offlinePrice" className="text-sm text-white font-medium">
        In-Person Fee (₹)
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
        <input
          id="offlinePrice"
          type="number"
          {...register("offlinePrice")}
          placeholder="500"
          className="w-full  text-white placeholder-gray-500 border border-gray-700 rounded-lg px-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#00c37a]"
        />
      </div>
      {errors.offlinePrice && (
        <p className="text-sm text-red-500">{errors.offlinePrice.message as string}</p>
      )}
    </div>

    {/* Online Fee */}
    <div className="space-y-2">
      <label htmlFor="onlinePrice" className="text-sm text-white font-medium">
        Online Fee (₹/min)
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
        <input
          id="onlinePrice"
          type="number"
          {...register("onlinePrice")}
          placeholder="20"
          className="w-full  text-white placeholder-gray-500 border border-gray-700 rounded-lg px-8 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-[#00c37a]"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">/min</span>
      </div>
      {errors.onlinePrice && (
        <p className="text-sm text-red-500">{errors.onlinePrice.message as string}</p>
      )}
    </div>
  </div>

  {/* Submit Button */}
  <div className="pt-4">
    <button
      type="submit"
      className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00c37a] to-[#019764] text-black font-semibold hover:opacity-90 transition-all flex justify-center items-center gap-2"
    >
      Save Changes
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </button>
  </div>
</form>

            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
                {user?.role === "doctor" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-[#00c37a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
                      />
                    </svg>
                    <p className="text-sm">
                      Your profile is under verification. Please wait to access
                      clinic details.
                    </p>
                  </>
                ) : (
                  // 👇 This will show image if not doctor
                  <img
                    src="/Assets/Svg/Profile.svg"
                    alt="Not available for patient"
                    className="w-60 h-auto object-contain"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

