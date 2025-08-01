"use client";
import React from "react";
import DoctorCard from "@/app/components/Doctors/DoctorCard";
import { doctorData } from "@/app/utils/data";
import CustomSearch from "@/app/components/Custom_UI/CustomSearch";
import {
  FaUserMd,
  FaFilter,
  FaStethoscope,
  FaClinicMedical,
  FaHospital,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

export default function DoctorsPage() {
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Ophthalmology",
    "Gynecology",
    "Psychiatry",
  ];

  const hospitals = [
    "City General Hospital",
    "Metropolitan Medical Center",
    "University Health System",
    "Children's Specialty Clinic",
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-[var(--color-bg)] min-h-screen text-[var(--color-text)]">
      <div className="text-center mb-12 bg-[var(--color-bg-alt)] py-12 px-4 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4 flex items-center justify-center gap-3">
          <MdHealthAndSafety className="text-[var(--secondary)] text-5xl" />
          <span>Find Your Trusted Healthcare Provider</span>
        </h1>
        <p className="text-[var(--color-text-light)] max-w-3xl mx-auto text-lg">
          Connect with board-certified physicians and specialists dedicated to
          providing exceptional care.
        </p>
      </div>

      <div className="mb-12  p-6 rounded-xl border border-[var(--color-border)]">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-3">
          <div className="p-2 bg-[var(--color-bg-alt)] rounded-full">
            <FaStethoscope className="text-[var(--secondary)] text-xl" />
          </div>
          <span>Medical Specialties</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {specialties.map((specialty) => (
            <div
              key={specialty}
              className="group bg-[var(--color-bg-alt)] hover:bg-green-900 p-4 rounded-lg transition-all duration-300 cursor-pointer border border-[var(--color-border)] hover:border-[var(--secondary)] hover:shadow-lg"
            >
              <div className="bg-[var(--primary)] group-hover:bg-[var(--color-bg)] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300">
                <FaUserMd className="text-[var(--secondary)] group-hover:text-white text-xl transition-colors duration-300" />
              </div>
              <span className="font-medium text-[var(--color-text)] text-center group-hover:text-white transition-colors duration-300 ">
                {specialty}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <FaClinicMedical className="text-[var(--secondary)]" />
            Available Physicians
          </h2>
         
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-[var(--color-bg-alt)] p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
            <FaUserMd className="text-[var(--secondary)]" />
            Our Doctors
          </h3>
          <p className="text-[var(--color-text-light)]">
            Our network includes over 500 board-certified physicians across 25
            specialties, with an average of 15 years clinical experience.
          </p>
        </div>
        <div className="bg-[var(--color-bg-alt)] p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
            <FaHospital className="text-[var(--secondary)]" />
            Hospital Affiliations
          </h3>
          <ul className="text-[var(--color-text-light)] space-y-2">
            {hospitals.map((hospital) => (
              <li key={hospital} className="flex items-center">
                <span className="w-2 h-2 bg-[var(--secondary)] rounded-full mr-2"></span>
                {hospital}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[var(--color-bg-alt)] p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-[var(--color-text)] mb-4 flex items-center gap-2">
            <FaStethoscope className="text-[var(--secondary)]" />
            Quality Care
          </h3>
          <p className="text-[var(--color-text-light)]">
            98% patient satisfaction rate with our physicians. Most appointments
            available within 24-48 hours.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[var(--secondary)] to-[var(--color-button-hover)] rounded-xl p-8 text-center text-white mb-12">
        <h3 className="text-2xl font-bold mb-4">Need Help Finding a Doctor?</h3>
        <p className="mb-6 max-w-2xl mx-auto text-lg">
          Our patient care coordinators can help you find the perfect specialist
          for your needs.
        </p>
        <button className="bg-white text-[var(--secondary)] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition text-lg">
          Contact Our Support Team
        </button>
      </div>
    </div>
  );
}
