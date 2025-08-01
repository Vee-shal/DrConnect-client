"use client";
import React from "react";
import { FaStar, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import CustomButton from "../Custom_UI/CustomButton";


type HospitalCardprops = {
  name: string;
  address: string;
  rating: number;
  imageUrl: string;
};
const HospitalCard = ({
    name,address,rating,imageUrl
}:HospitalCardprops) => {
  return (
    <div className="p-4 flex justify-center">
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--color-bg-alt)] text-[var(--color-text)] shadow-xl p-6 transition hover:shadow-2xl border-2">
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-[var(--secondary)] text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <FaStar className="text-[var(--color-warning)]" />
          {rating}
        </div>

        <Image
          src={imageUrl || "/dummy.jpg"}
          width={100}
          height={100}
          alt="Doctor"
          className="rounded-lg border-1 border-green-400 object-cover"
        />

        {/* Hospital Name */}
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
         {name}
        </h2>

        {/* Address */}
        <p className="text-sm text-[var(--color-text-light)] mt-1">
         {address}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <CustomButton 
          text="View"
          icon=""
          onClick={()=>{
            console.log("View Pressed")
          }}/>
          <CustomButton 
          text="Call Now"
          icon=""
          onClick={()=>{
            console.log("Call Pressed")
          }}/>
       
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;
