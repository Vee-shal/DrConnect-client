"use client";
import HospitalCard from "@/app/components/Hospital/HospitalCard";
import React, { useEffect, useState } from "react";
import { hospitalData } from "@/app/utils/data";
import CustomSearch from "@/app/components/Custom_UI/CustomSearch";
import { FaHospital, FaUserMd, FaHeartbeat, FaClock } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

const Hospital = () => {
  const [hospitals, setHospitals] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [emergency, setEmergency] = useState(false);

  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();

    const animateCount = () => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);

      setHospitals(Math.floor(progress * 100));
      setSatisfaction(Math.floor(progress * 98));
      setDoctors(Math.floor(progress * 500));

      if (progress >= 1) {
        setEmergency(true);
      } else {
        requestAnimationFrame(animateCount);
      }
    };

    animateCount();
  }, []);

  return (
    <div className="container p-10 bg-[#111111] min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <MdHealthAndSafety className="text-blue-500" />
          Find the Best Healthcare Facilities
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Discover top-rated hospitals with specialized care, advanced
          technology, and experienced medical professionals to meet all your
          healthcare needs.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="w-full md:w-1/2">
            <CustomSearch
              placeholder="Search for hospitals by name, specialty or location..."
              onChange={() => {}}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 flex-1">
              <option value="">All Specialties</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="pediatrics">Pediatrics</option>
            </select>
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 flex-1">
              <option value="">All Locations</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
            </select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-800 p-4 rounded-lg flex flex-wrap justify-between items-center">
          <div className="text-center px-4 py-2">
            <FaHospital className="mx-auto text-blue-400 text-2xl mb-2" />
            <p className="text-2xl font-bold text-blue-400">{hospitals}+</p>
            <p className="text-gray-300 text-sm">Hospitals Listed</p>
          </div>
          <div className="text-center px-4 py-2">
            <FaHeartbeat className="mx-auto text-green-400 text-2xl mb-2" />
            <p className="text-2xl font-bold text-green-400">{satisfaction}%</p>
            <p className="text-gray-300 text-sm">Patient Satisfaction</p>
          </div>
          <div className="text-center px-4 py-2">
            <FaClock className="mx-auto text-purple-400 text-2xl mb-2" />
            <p className="text-2xl font-bold text-purple-400">
              {emergency ? "24/7" : "0/0"}
            </p>
            <p className="text-gray-300 text-sm">Emergency Services</p>
          </div>
          <div className="text-center px-4 py-2">
            <FaUserMd className="mx-auto text-yellow-400 text-2xl mb-2" />
            <p className="text-2xl font-bold text-yellow-400">{doctors}+</p>
            <p className="text-gray-300 text-sm">Specialist Doctors</p>
          </div>
        </div>
      </div>

      {/* Featured Hospitals */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <FaHospital className="text-blue-500" />
          Featured Hospitals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitalData.slice(0, 3).map((hospital) => (
            <HospitalCard
              key={hospital.id}
              name={hospital.name}
              address={hospital.address}
              rating={hospital.rating}
              imageUrl={hospital.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* All Hospitals */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">All Hospitals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitalData.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              name={hospital.name}
              address={hospital.address}
              rating={hospital.rating}
              imageUrl={hospital.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mt-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Cant Find What You Need?
        </h3>
        <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
          Our healthcare concierge team can help you find specialized treatment
          options or connect you with the right medical professionals.
        </p>
        <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Contact Healthcare Advisor
        </button>
      </div>
    </div>
  );
};

export default Hospital;
