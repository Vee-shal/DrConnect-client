"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { doctorProfileSchema } from "@/app/lib/validations/DoctorFormSchema";
import { _makePostRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/lib/store/authStore";

const DoctorFormComponent = () => {
  const { user } = useAuthStore(); // ✅ get logged-in user

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(doctorProfileSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await _makePostRequest(endpoints.PROFILE. UPDATE_DOCTOR , {
        ...data,
        email: user?.email,
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

  return (
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
                  <label
                    htmlFor="clinicName"
                    className="text-sm text-white font-medium"
                  >
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
                    <p className="text-sm text-red-500">
                      {errors.clinicName.message as string}
                    </p>
                  )}
                </div>

                {/* Clinic Address */}
                <div className="space-y-2">
                  <label
                    htmlFor="clinicAddress"
                    className="text-sm text-white font-medium"
                  >
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
                    <p className="text-sm text-red-500">
                      {errors.clinicAddress.message as string}
                    </p>
                  )}
                </div>

                {/* Fees Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* In-Person Fee */}
                  <div className="space-y-2">
                    <label
                      htmlFor="offlinePrice"
                      className="text-sm text-white font-medium"
                    >
                      In-Person Fee (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ₹
                      </span>
                      <input
                        id="offlinePrice"
                        type="number"
                        {...register("offlinePrice")}
                        placeholder="500"
                        className="w-full  text-white placeholder-gray-500 border border-gray-700 rounded-lg px-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#00c37a]"
                      />
                    </div>
                    {errors.offlinePrice && (
                      <p className="text-sm text-red-500">
                        {errors.offlinePrice.message as string}
                      </p>
                    )}
                  </div>

                  {/* Online Fee */}
                  <div className="space-y-2">
                    <label
                      htmlFor="onlinePrice"
                      className="text-sm text-white font-medium"
                    >
                      Online Fee (₹/min)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ₹
                      </span>
                      <input
                        id="onlinePrice"
                        type="number"
                        {...register("onlinePrice")}
                        placeholder="20"
                        className="w-full  text-white placeholder-gray-500 border border-gray-700 rounded-lg px-8 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-[#00c37a]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        /min
                      </span>
                    </div>
                    {errors.onlinePrice && (
                      <p className="text-sm text-red-500">
                        {errors.onlinePrice.message as string}
                      </p>
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </form>
  );
};

export default DoctorFormComponent;
