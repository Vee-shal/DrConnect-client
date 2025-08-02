"use client";
import React from "react";
import Image from "next/image";
import { FaStar, FaRegCalendarAlt, FaUserMd } from "react-icons/fa";
import CustomButton from "../Custom_UI/CustomButton";

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
    <div className="flex justify-center px-4 py-6">
      <div className="w-full max-w-sm bg-[#111] text-white rounded-xl border border-[#08392e] shadow-md hover:shadow-lg transition-shadow duration-300 relative">
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 border border-[#00c37a] text-[#00c37a] text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-sm z-10 bg-[#111]">
          <FaStar className="text-[#00c37a]" />
          <span className="font-semibold">{rating}</span>
        </div>

        {/* Image */}
      <div className="flex justify-center pt-6 pb-3 rounded-full">
  <Image
    src={imageUrl || "/banner2.webp"}
    alt={name}
    width={120}
    height={120}
    className="rounded-full object-cover border-4 border-[#00c37a] shadow-md w-[120px] h-[120px]"
  />
</div>


        {/* Text Content */}
        <div className="px-6 pb-6">
          <div className="text-center mb-3">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-[#00c37a] font-medium tracking-wide uppercase mt-1">
              {specialization}
            </p>
          </div>

          <p className="text-sm text-gray-400 text-center leading-relaxed mb-5">
            {description}
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <FaUserMd className="text-[#00c37a]" />
              <span>{patients}+ patients</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-[#00c37a]" />
              <span>{experience} yrs</span>
            </div>
          </div>

          {/* Buttons - centered and full-width */}
          <div className="flex flex-col items-center gap-3">
            <CustomButton
              text="View Profile"
              onClick={() => console.log("View clicked")}
              variant="outlined"
            
            />
            <CustomButton
              text="Book Consultation"
              onClick={() => console.log("Consult clicked")}
              variant="contained"
         
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
