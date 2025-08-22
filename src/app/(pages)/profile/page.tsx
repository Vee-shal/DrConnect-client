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
import DoctorProfileForm from "../../components/Profile/DoctorForm";
import PatientProfileForm from "../../components/Profile/PatientForm";
import ProfilePhoto from "@/app/components/Profile/profilephoto";

const Page = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      router.push("/Login");
    } else {
      setMounted(true);
    }
  }, [router, user, token]);

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


        {/* Profile Photo and Title */}
        <ProfilePhoto />

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
            {user?.role === "doctor" ? (
              user.verified ? (
                <DoctorProfileForm />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
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
                </div>
              )
            ) : (
              <PatientProfileForm />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
