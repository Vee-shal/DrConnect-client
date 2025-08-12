"use client";
import { _makeGetRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import { useAuthStore } from "@/app/lib/store/authStore";
import React, { useEffect, useState } from "react";

// 1️⃣ Define the appointment type
type Appointment = {
  id: number | string;
  date: string;
  time: string;
  mode: "Online" | "Offline" | string;
  doctor: { name: string };
  status: "Confirmed" | "Pending" | "Completed" | string;
};

const PatientTable = () => {
  // 2️⃣ Use typed state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const user = useAuthStore((state) => state.user);

  const Status = ["All", "Completed", "Pending", "Active", "Accepted", "Rejected"];
  const Time = ["All", "Today", "Week", "Month"];
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeTime, setActiveTime] = useState("All");

  const handleRequest = async () => {
    const params = {
      patientId: user?.id,
      status: activeStatus.toLowerCase() === "all" ? "" : activeStatus,
      time: activeTime.toLowerCase() === "all" ? "" : activeTime
    };

    const res = await _makeGetRequest(endpoints.APPOINTMENT.GET_APPOINTMENTS, params);
    setAppointments(res.data as Appointment[]); 
    console.log(res);
  };

  // 4️⃣ Use correct dependencies
  useEffect(() => {
    handleRequest();
  }, [activeTime, activeStatus]);

  return (
    <div className="container bg-[#111] p-6 min-h-[45.8vh] shadow-xl border border-[#1ebc8b]/20 text-white">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-3xl">
            Hello, <span className="text-[#1ebc8b] text-2xl ">{user?.name || "User"}</span>
          </h2>
          <p className="text-sm text-gray-400 mt-5">Your upcoming appointments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">Status</span>
            <div className="flex flex-wrap gap-1">
              {Status.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveStatus(filter)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all
                    ${activeStatus === filter
                      ? "bg-[#1ebc8b] text-gray-900"
                      : "bg-[#222] text-gray-300 hover:bg-[#333]"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">Time</span>
            <div className="flex flex-wrap gap-1">
              {Time.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveTime(filter)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all
                    ${activeTime === filter
                      ? "bg-[#1ebc8b] text-gray-900"
                      : "bg-[#222] text-gray-300 hover:bg-[#333]"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hidden lg:block rounded-lg border border-[#1ebc8b]/20 shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#1ebc8b]/10 backdrop-blur-sm">
            <tr>
              {["Appointment ID", "Date", "Time", "Mode", "Doctor Name", "Status"].map((header) => (
                <th
                  key={header}
                  className="border-b border-[#1ebc8b]/30 px-6 py-3 text-left text-xs font-semibold text-[#1ebc8b] uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1ebc8b]/10">
            {appointments && appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr
                  key={`${appt.id}-${index}`}
                  className="hover:bg-[#1ebc8b]/10 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                    # {appt.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {appt.date || "Not Available"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {appt.time || "Not Available"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        appt.mode === "Online"
                          ? "bg-blue-900/50 text-blue-300"
                          : "bg-purple-900/50 text-purple-300"
                      }`}
                    >
                      {appt.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {appt?.doctor?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        appt.status === "Confirmed"
                          ? "bg-green-900/50 text-green-300"
                          : "bg-yellow-900/50 text-yellow-300"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-400"
                >
                  You have no appointment on this filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="lg:hidden space-y-3">
        {appointments && appointments.length > 0 ? (
          appointments.map((appt) => (
            <div
              key={appt.id}
              className="p-4 rounded-lg border border-[#1ebc8b]/20 bg-[#1a1a1a] hover:bg-[#1ebc8b]/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-[#1ebc8b] capitalize">
                  {appt.doctor?.name || "Unknown Doctor"}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    appt.status === "Confirmed"
                      ? "bg-green-900/50 text-green-300"
                      : "bg-yellow-900/50 text-yellow-300"
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Date</p>
                  <p>{appt.date || "Not available"}</p>
                </div>
                <div>
                  <p className="text-gray-400">Time</p>
                  <p>{appt.time || "Not available"}</p>
                </div>
                <div>
                  <p className="text-gray-400">Mode</p>
                  <span
                    className={`text-xs  rounded-full}`}
                  >
                    {appt.mode}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400">Appointment ID</p>
                  <p>#{appt.id}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 rounded-lg border border-[#1ebc8b]/20 bg-[#1a1a1a] text-center text-gray-400">
            You have no appointments for this filter
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientTable;
