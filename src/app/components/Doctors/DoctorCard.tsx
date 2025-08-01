"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "../Custom_UI/CustomButton";
import { FaStar, FaRegCalendarAlt, FaUserMd } from "react-icons/fa";

type DoctorCardProps = {
  name: string;
  specialization: string;
  description: string;
  rating: number;
  imageUrl: string;
  experience?: number;
  patients?: number;
};

const DoctorCard = ({
  name,
  specialization,
  description,
  rating,
  imageUrl,
  experience = 5,
  patients = 1200,
}: DoctorCardProps) => {
  return (
    <div className="p-4 flex justify-center">
      <div className="relative w-full max-w-sm rounded-xl bg-white text-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white text-gray-800 text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold">{rating}</span>
        </div>

        {/* Doctor Image */}
        <div className="relative h-48 bg-gradient-to-r from-cyan-50 to-blue-50 flex justify-center items-center">
          <Image
            src={imageUrl}
            alt={`Dr. ${name}`}
            width={120}
            height={120}
            className="rounded-full border-4 border-white object-cover shadow-lg"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="p-6 pt-4">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
            <h2 className="text-sm text-blue-600 font-medium tracking-wide uppercase mt-1">
              {specialization}
            </h2>
          </div>

          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaUserMd className="text-blue-500" />
              <span>{patients}+ patients</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaRegCalendarAlt className="text-blue-500" />
              <span>{experience} years</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <CustomButton
              text="View Profile"
              // variant="outlined"
              
              onClick={() => console.log("View clicked")}
            />
            <CustomButton
              text="Book Consultation"
              // variant="contained"
              
              onClick={() => console.log("Consult clicked")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;