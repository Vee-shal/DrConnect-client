// components/PatientProfileForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/lib/store/authStore";
import { _makePostRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import { patientProfileSchema } from "@/app/lib/validations/patientFormSchema";

const PatientProfileForm = () => {
  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(patientProfileSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Patient Data Submitted:", data);

      const res = await _makePostRequest(endpoints.PROFILE.UPDATE_PATIENT, {
        ...data,
        email: user?.email,
      });

      if (res.status === 200) {
        useAuthStore
        toast.success("Profile updated successfully");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update patient profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Gender */}
      <div>
        <label className="text-sm font-medium text-white">Gender</label>
        <select
          {...register("gender")}
          className="w-full text-white bg-[#1a1a1a] border border-gray-700 rounded px-4 py-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      {/* Age */}
      <div>
        <label className="text-sm font-medium text-white">Age</label>
        <input
          type="number"
          {...register("age")}
          className="w-full text-white bg-[#1a1a1a] border border-gray-700 rounded px-4 py-2"
        />
        {errors.age && (
          <p className="text-sm text-red-500">{errors.age.message}</p>
        )}
      </div>

      {/* Height */}
      <div>
        <label className="text-sm font-medium text-white">Height (cm)</label>
        <input
          type="number"
          {...register("height")}
          className="w-full text-white bg-[#1a1a1a] border border-gray-700 rounded px-4 py-2"
        />
        {errors.height && (
          <p className="text-sm text-red-500">{errors.height.message}</p>
        )}
      </div>

      {/* Weight */}
      <div>
        <label className="text-sm font-medium text-white">Weight (kg)</label>
        <input
          type="number"
          {...register("weight")}
          className="w-full text-white bg-[#1a1a1a] border border-gray-700 rounded px-4 py-2"
        />
        {errors.weight && (
          <p className="text-sm text-red-500">{errors.weight.message}</p>
        )}
      </div>

      {/* Blood Group */}
      <div>
        <label className="text-sm font-medium text-white">Blood Group</label>
        <select
          {...register("bloodGroup")}
          className="w-full text-white bg-[#1a1a1a] border border-gray-700 rounded px-4 py-2"
        >
          <option value="">Select</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {errors.bloodGroup && (
          <p className="text-sm text-red-500">{errors.bloodGroup.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-[#00c37a] to-[#019764] text-black font-semibold rounded-lg"
      >
        Save Patient Details
      </button>
    </form>
  );
};

export default PatientProfileForm;
