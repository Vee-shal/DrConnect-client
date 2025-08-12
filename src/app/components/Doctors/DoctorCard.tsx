"use client";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { useAuthStore } from "@/app/lib/store/authStore"; // Adjust path as per your project
import AppointmentFormComponent from "../Appointment/Appointment";

interface DoctorCardProps {
  userId:number,
  name: string;
  specialization: string;
  experience: number;
  imageUrl?: string;
  rating?: number;
  clinicName?: string;
  clinicAddress?: string;
  onlinePrice?: number;
  offlinePrice?: number;
}

const DoctorCard = ({
  userId,
  name,
  specialization,
  experience,
  imageUrl,
  rating,
  clinicName,
  clinicAddress,
  onlinePrice,
  offlinePrice,
}: DoctorCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleBookAppointment = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-[#111111] p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#1ebc8b]/10 text-white flex flex-col justify-between h-full">
        <div>
          <div className="relative overflow-hidden rounded-md mb-4 group">
            <img
              src={imageUrl || "/Assets/banner2.webp"}
              alt={name}
              className="w-full h-48 object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium">{specialization}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-[#1ebc8b]/10 text-[#1ebc8b] text-xs rounded-full">
                {specialization}
              </span>
              <span className="text-sm text-[#b0b0b0]">⭐ 4.8</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#b0b0b0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{experience}+ years experience</span>
            </div>

            {clinicName && (
              <div className="flex items-start gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#1ebc8b"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>{clinicName}</span>
              </div>
            )}

            {clinicAddress && (
              <div className="flex items-start gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#1ebc8b"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="line-clamp-2">{clinicAddress}</span>
              </div>
            )}

            <div className="pt-2 space-y-1">
              {onlinePrice && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#b0b0b0] flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Online
                  </span>
                  <span className="font-medium">₹{onlinePrice}</span>
                </div>
              )}

              {offlinePrice && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#b0b0b0] flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Offline
                  </span>
                  <span className="font-medium">₹{offlinePrice}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <button
          onClick={handleBookAppointment}
          className="mt-6 bg-[#1ebc8b] hover:bg-[#17a17a] text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Request Appointment
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal} // clicking on backdrop closes modal
        >
          <div
            className="bg-[#111] rounded-2xl p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()} // click inside modal should NOT close
          >
            <button
              className="text-white mb-4 font-bold text-xl float-right"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <AppointmentFormComponent patientId={user?.id} doctorId={userId}/>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorCard;
