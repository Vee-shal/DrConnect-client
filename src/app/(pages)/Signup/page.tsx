"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaAward,
  FaIdCard,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { MdWork, MdHealthAndSafety } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  doctorSchema,
  patientSchema,
} from "@/app/lib/validations/SignupSchema";
import { _makePostRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/authStore";
type Role = "doctor" | "user";
type SignupFormInputs = {
  name: string;
  phone_number: string;
  email: string;
  password: string;
  role: "doctor" | "user";
  specialization?: string;
  experience?: number;
  license?: string;
  certificate?: FileList | null;
};
const SignUpForm = () => {
  const [role, setRole] = useState<Role>("doctor");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(role === "doctor" ? doctorSchema : patientSchema),
    defaultValues: {
      role: role,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
 const onSubmit = async (data: SignupFormInputs) => {
  try {
    const formData = new FormData();

    // Common fields
    formData.append("name", data.name);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("verified", "false");

    if (data.role === "doctor") {
      formData.append("specialization", data.specialization || "");
      formData.append("experience", String(data.experience || ""));
      formData.append("license", data.license || "");

      // Certificate file (agar select kiya h to)
      if (data.certificate && data.certificate[0]) {
        formData.append("certificate", data.certificate[0]);
      }
    }

    const res = await _makePostRequest(endpoints.AUTH.REGISTER, formData)


    console.log("res===>", res);

    if (res?.token && res?.user) {
      useAuthStore.getState().setUser(res.user);
      useAuthStore.getState().setToken(res.token);
      toast.success("Registration successful!");
      router.push("/profile");
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <section className="bg-[#0a0a0a] text-white py-10 px-4 sm:px-6 lg:px-8 container">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {role === "doctor" ? "Join as a Doctor" : "Join as a Patient"}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mt-1">
            {role === "doctor"
              ? "Register and connect with patients across the city"
              : "Create your account to consult verified doctors"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4 text-sm">
          <p className="text-white font-medium text-center">Sign in as:</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setValue("role", "doctor");
                setRole("doctor");
              }}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                role === "doctor"
                  ? "bg-[#00c37a] text-black"
                  : "bg-gray-800 text-white border border-[#00c37a]/30"
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => {
                setValue("role", "user");
                setRole("user");
              }}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                role === "user"
                  ? "bg-[#00c37a] text-black"
                  : "bg-gray-800 text-white border border-[#00c37a]/30"
              }`}
            >
              Patient
            </button>
          </div>
        </div>

        <div className="bg-[#111]/60 backdrop-blur-xl border border-[#08392e] rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Illustration */}
            <div className="lg:w-1/2 bg-[#0f1f1b] p-6 flex flex-col justify-center">
              <div className="text-center mb-4">
                <MdHealthAndSafety className="mx-auto h-14 w-14 text-[#00c37a]" />
                <h3 className="text-xl font-semibold mt-3">Smart Healthcare</h3>
                <p className="text-sm text-gray-400">
                  Secure your health records and consultations
                </p>
              </div>
              <div className="h-80 relative hidden sm:block border border-[#00c37a]/20 rounded-xl overflow-hidden">
                <Image
                  src="/Assets/Svg/DrSignUp.svg"
                  alt="Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full p-4 sm:p-6 lg:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 text-sm"
              >
                {/* Full Name */}
                <div>
                  <label className="block mb-1 text-gray-300">Full Name</label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5 relative">
                    <FaUser />
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Full Name"
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm ml-2"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block mb-1 text-gray-300">
                    Mobile Number
                  </label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5 relative">
                    <FaPhone />
                    <input
                      {...register("phone_number")}
                      type="text"
                      placeholder="Mobile Number"
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm ml-2"
                    />
                  </div>
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-gray-300">Email</label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5 relative">
                    <FaEnvelope />
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm ml-2"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 text-gray-300">Password</label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5 relative">
                    <FaLock />
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm ml-2"
                    />
                    <span
                      className="absolute right-2 text-gray-500 cursor-pointer text-xs"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Doctor Only Fields */}
                {role === "doctor" && (
                  <>
                    {/* Specialization */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        Specialization
                      </label>
                      <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                        <FaAward />
                        <input
                          {...register("specialization")}
                          type="text"
                          placeholder="Specialization"
                          className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm ml-2"
                        />
                      </div>
                      {errors.specialization && (
                        <p className="text-red-500 text-xs">
                          {errors.specialization.message}
                        </p>
                      )}
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        Experience (Years)
                      </label>
                      <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                        <MdWork />
                        <input
                          {...register("experience", { valueAsNumber: true })}
                          type="number"
                          placeholder="Experience"
                          className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm ml-2"
                        />
                      </div>
                      {errors.experience && (
                        <p className="text-red-500 text-xs">
                          {errors.experience.message}
                        </p>
                      )}
                    </div>

                    {/* License */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        License No.
                      </label>
                      <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                        <FaIdCard />
                        <input
                          {...register("license")}
                          type="text"
                          placeholder="License No."
                          className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm ml-2"
                        />
                      </div>
                      {errors.license && (
                        <p className="text-red-500 text-xs">
                          {errors.license.message}
                        </p>
                      )}
                    </div>

                    {/* Certificate Upload */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        Upload Certificate
                      </label>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        {...register("certificate")}
                        className="block w-full text-sm text-gray-400
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-[#00c37a]/20 file:text-[#00c37a]
                   hover:file:bg-[#00c37a]/30"
                      />
                      {errors.certificate && (
                        <p className="text-red-500 text-xs">
                          {errors.certificate.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#00c37a] text-black font-semibold py-2.5 rounded-md hover:bg-[#00aa66] transition text-sm"
                >
                  {role === "doctor"
                    ? "Register as Doctor"
                    : "Register as Patient"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
