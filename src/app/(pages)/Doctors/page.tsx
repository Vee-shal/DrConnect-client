"use client";
import React from "react";
import DoctorCard from "@/app/components/Doctors/DoctorCard";
import { doctorData, hospitals, specialties } from "@/app/utils/data";
import {
  FaUserMd,
  FaStethoscope,
  FaClinicMedical,
  FaHospital,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

export default function DoctorsPage() {
  return (
    <div className="container  px-4 py-8 bg-[#0d0d0d]  text-white">
      {/* Header */}
      <div className="text-center mb-12 bg-[#111111] py-12 px-4 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <MdHealthAndSafety className="text-[#1ebc8b] text-5xl" />
          <span>Find Your Trusted Healthcare Provider</span>
        </h1>
        <p className="text-[#b0b0b0] max-w-3xl mx-auto text-lg">
          Connect with board-certified physicians and specialists dedicated to
          providing exceptional care.
        </p>
      </div>

      {/* Specialties */}
      <div className="mb-12 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-[#111111] rounded-full">
            <FaStethoscope className="text-[#1ebc8b] text-xl" />
          </div>
          <span>Medical Specialties</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6  py-6">
          {specialties.map((specialty) => (
            <div
              key={specialty}
              className="group bg-[#0d0d0d] hover:bg-[#1b1b1b] p-6 rounded-xl border border-[#1ebc8b] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1ebc8b] to-[#0d7f64] group-hover:from-[#0d0d0d] group-hover:to-[#0d0d0d] flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                <FaUserMd className="text-[#0d0d0d] group-hover:text-[#1ebc8b] text-2xl transition-colors duration-300" />
              </div>

              <p className="text-white text-center font-semibold text-sm group-hover:text-[#1ebc8b] transition-colors duration-300">
                {specialty}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Doctors */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaClinicMedical className="text-[#1ebc8b]" />
            Available Physicians
          </h2>
        </div>
        <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorData.slice(0, 3).map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              imageUrl={doctor.imageUrl}
              description={doctor.description}
              specialization={doctor.specialization}
              rating={doctor.rating}
            />
          ))}
        </div>
        <div className="md:grid hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              imageUrl={doctor.imageUrl}
              description={doctor.description}
              specialization={doctor.specialization}
              rating={doctor.rating}
            />
          ))}
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-[#111111] p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaUserMd className="text-[#1ebc8b]" />
            Our Doctors
          </h3>
          <p className="text-[#b0b0b0]">
            Our network includes over 500 board-certified physicians across 25
            specialties, with an average of 15 years clinical experience.
          </p>
        </div>

        <div className="bg-[#111111] p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaHospital className="text-[#1ebc8b]" />
            Hospital Affiliations
          </h3>
          <ul className="text-[#b0b0b0] space-y-2">
            {hospitals.map((hospital) => (
              <li key={hospital} className="flex items-center">
                <span className="w-2 h-2 bg-[#1ebc8b] rounded-full mr-2"></span>
                {hospital}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#111111] p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaStethoscope className="text-[#1ebc8b]" />
            Quality Care
          </h3>
          <p className="text-[#b0b0b0]">
            98% patient satisfaction rate with our physicians. Most appointments
            available within 24-48 hours.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full flex justify-center">
        <div  className="bg-gradient-to-r w-fit from-[#00573c] to-[#00281c] rounded-xl p-8 text-center text-white mb-12">
          <h3 className="text-2xl font-bold mb-4">Need Help Finding a Doctor?</h3>
          <p className="mb-6 max-w-2xl mx-auto text-lg">
            Our patient care coordinators can help you find the perfect specialist
            for your needs.
          </p>
         <div className="flex items-center justify-center">
           <div className="flex justify-center items-center bg-white rounded-lg">
            <button className="bg-gradient-to-r from-[#00573c] to-[#00281c] bg-clip-text text-transparent font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition text-base sm:text-lg text-center">
              Contact Our Support Team
            </button>
          </div>
         </div>
        </div>
      </div>



    </div>

  );
}
