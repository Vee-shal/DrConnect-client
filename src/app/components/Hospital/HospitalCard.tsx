"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import CustomButton from "../Custom_UI/CustomButton";

type HospitalCardProps = {
  name: string;
  address: string;
  rating: number;
  imageUrl: string;
};

const HospitalCard = ({ name, address, rating, imageUrl }: HospitalCardProps) => {
  return (
    <div className="p-4 flex justify-center">
      <div className="relative w-full max-w-sm bg-[#00000077] border border-[#00573c]/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00573c] to-[#00281c] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <FaStar className="text-yellow-400 text-sm" />
          <span>{rating}</span>
        </div>

        {/* Image */}
        <div className="w-full h-40 overflow-hidden  ">
          <Image
            src={imageUrl || "/banner2.webp"}
            width={400}
            height={160}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info Section */}
        <div className="p-5 text-center">
          <h2 className="text-xl font-bold text-[#ffffff]">{name}</h2>
          <p className="text-sm text-[#ffffffb2] mt-1">{address}</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-5">
            <CustomButton
              text="View"
              variant="contained"
           
              onClick={() => console.log("View Pressed")}
            />
            <CustomButton
              text="Call Now"
              variant="outlined"
            
              onClick={() => console.log("Call Pressed")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
