"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaUserMd,
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
import { endpoints } from "@/app/lib/api/endpoints";
import { _makePostRequest } from "@/app/lib/api/apiClients";
import { toast } from "react-hot-toast";

// Example:
toast.success("Registration Successful!");
toast.error("Registration Failed!");

type FormDataType = {
  fullName: string;
  phone_number: string;
  email: string;
  specialization: string;
  experience: string | number;
  license: string;
  password: string;
  certificate: string | null;
};
const SignUpForm = () => {
  const [role, setRole] = useState<"doctor" | "user">("doctor");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    phone_number: "",
    email: "",
    specialization: "",
    experience: "",
    license: "",
    password: "",
    certificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Prepare payload based on role
      const payload =
        role === "doctor"
          ? {
              name: formData.fullName,
              email: formData.email,
              phone_number: String(formData.phone_number),
              specialization: formData.specialization,
              experience: Number(formData.experience),
              license: formData.license,
              certificate: String(formData.certificate),
              role: "doctor",
              password: formData.password,
            }
          : {
              name: formData.fullName,
              email: formData.email,
              phone_number: String(formData.phone_number),
              password: formData.password,
              role: "user",
            };

      // API Call
      const res = await _makePostRequest<{ message: string }, typeof payload>(
        endpoints.AUTH.REGISTER,
        payload
      );

      console.log("✅ Registration Successful:", res.message);

      toast.success(res.message || "Registration successful!");
      // ✅ Reset form
      setFormData({
        fullName: "",
        email: "",
        phone_number: "",
        specialization: "",
        experience: "",
        license: "",
        certificate: null,
        password: "",
      });
    } catch (err: unknown) {
      console.error("❌ Registration Failed:", err);
    }
  };

  return (
    <section className="bg-[#0a0a0a] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
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

        {/* Role Toggle */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              role === "doctor"
                ? "bg-[#00c37a] text-black"
                : "bg-gray-800 text-white border border-[#00c37a]/30"
            }`}
            onClick={() => setRole("doctor")}
          >
            As Doctor
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              role === "user"
                ? "bg-[#00c37a] text-black"
                : "bg-gray-800 text-white border border-[#00c37a]/30"
            }`}
            onClick={() => setRole("user")}
          >
            As Patient
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-[#111]/60 backdrop-blur-xl border border-[#08392e] rounded-2xl overflow-hidden shadow-md">
          <div className="flex flex-col lg:flex-row">
            {/* Illustration */}
            <div className="lg:w-1/2 bg-[#0f1f1b] p-6 flex flex-col justify-center">
              <div className="text-center mb-4">
                <MdHealthAndSafety className="mx-auto h-14 w-14 text-[#00c37a]" />
                <h3 className="text-xl font-semibold mt-3">Smart Healthcare</h3>
                <p className="text-sm text-gray-400">
                  Secure your health records and consultations
                </p>
              </div>

              {/* Hidden on phone_number, visible on sm and up */}
              <div className="h-80 relative hidden sm:block border border-[#00c37a]/20 rounded-xl overflow-hidden">
                <Image
                  src={
                    role === "doctor"
                      ? "/Assets/Svg/DrSignUp.svg"
                      : "/Assets/Svg/DrSignUp.svg"
                  }
                  alt="Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Form */}
            <div className="w-full p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                {/* Full Name */}
                <div>
                  <label className="block mb-1 text-gray-300">Full Name</label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                    <FaUser className="text-gray-500 mr-2 text-sm" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>

                {/* phone_number Number */}
                <div>
                  <label className="block mb-1 text-gray-300">
                    Mobile Number
                  </label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                    <FaPhone className="text-gray-500 mr-2 text-sm" />
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-gray-300">Email</label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                    <FaEnvelope className="text-gray-500 mr-2 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 text-gray-300">Password</label>
                  <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5 relative">
                    <FaLock className="text-gray-500 mr-2 text-sm" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                    />
                    <div
                      className="absolute right-2 text-gray-500 cursor-pointer text-xs"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>

                {/* Doctor-specific fields */}
                {role === "doctor" && (
                  <>
                    {/* Specialization */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        Specialization
                      </label>
                      <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                        <FaAward className="text-gray-500 mr-2 text-sm" />
                        <input
                          type="text"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          placeholder="Cardiology"
                          required
                          className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        Experience (years)
                      </label>
                      <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                        <MdWork className="text-gray-500 mr-2 text-sm" />
                        <input
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="5"
                          required
                          className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* License No */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        License No.
                      </label>
                      <div className="flex items-center bg-[#1a1a1a] border border-[#08392e] rounded-md px-2 py-1.5">
                        <FaIdCard className="text-gray-500 mr-2 text-sm" />
                        <input
                          type="text"
                          name="license"
                          value={formData.license}
                          onChange={handleChange}
                          placeholder="DMC123456"
                          required
                          className="bg-transparent w-full outline-none text-white placeholder-gray-500 text-sm"
                        />
                      </div>
                    </div>

                    {/* Certificate Upload */}
                    <div>
                      <label className="block mb-1 text-gray-300">
                        Medical Certificate
                      </label>
                      <input
                        type="file"
                        name="certificate"
                        onChange={handleChange}
                        required
                        className="bg-[#1a1a1a] border border-[#08392e] text-gray-300 rounded-md p-2 w-full file:bg-[#00c37a] file:text-black file:font-medium file:px-4 file:py-2 file:rounded-md text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Submit Button */}
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
