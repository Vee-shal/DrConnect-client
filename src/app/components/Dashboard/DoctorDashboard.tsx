"use client";
import React from "react";

const DoctorDashboard = () => {
  return (
    <section className="min-h-screen bg-gray-950 text-gray-200 p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-6">
        Doctor Dashboard
      </h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatsCard title="Total Patients" value="2000+" subtitle="Till Today" />
        <StatsCard title="Today Patients" value="68" subtitle="07 Aug 2025" />
        <StatsCard
          title="Today Appointments"
          value="85"
          subtitle="07 Aug 2025"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Summary */}
        <div className="bg-gray-900 p-6 rounded-xl border border-emerald-600">
          <h2 className="text-xl font-semibold mb-4">Patients Summary</h2>
          <div className="w-full h-52 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">[Pie Chart Placeholder]</span>
          </div>
          <ul className="mt-4 text-sm text-gray-400 space-y-1">
            <li>🟡 New Patients</li>
            <li>🔵 Old Patients</li>
            <li>⚪ Total Patients</li>
          </ul>
        </div>

        {/* Appointments */}
        <div className="bg-gray-900 p-6 rounded-xl border border-emerald-600">
          <h2 className="text-xl font-semibold mb-4">Today's Appointments</h2>
          <ul className="space-y-4">
            {["M.J. Mical", "Sanath Deo", "Loeara Phanj", "Komola Haris"].map(
              (name, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border-b border-gray-800 pb-2"
                >
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-400">Health Checkup</p>
                  </div>
                  <span className="text-sm text-emerald-400">
                    {["On Going", "12:30 PM", "1:00 PM", "1:30 PM"][i]}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Next Patient Details */}
        <div className="bg-gray-900 p-6 rounded-xl border border-emerald-600">
          <h2 className="text-xl font-semibold mb-4">Next Patient</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">Name:</span> Sanath Deo
            </p>
            <p>
              <span className="text-gray-400">DOB:</span> 15 Jan 1989
            </p>
            <p>
              <span className="text-gray-400">Sex:</span> Male
            </p>
            <p>
              <span className="text-gray-400">Weight:</span> 59kg
            </p>
            <p>
              <span className="text-gray-400">Height:</span> 172 cm
            </p>
            <p>
              <span className="text-gray-400">Last Appointment:</span> 15 Dec
              2021
            </p>
          </div>
          <div className="mt-4 space-x-2">
            <span className="bg-emerald-700 px-3 py-1 rounded-full text-sm">
              Asthma
            </span>
            <span className="bg-yellow-700 px-3 py-1 rounded-full text-sm">
              Hypertension
            </span>
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
              Fever
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white">
              📞 Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;

// 📦 STATS CARD COMPONENT
const StatsCard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) => (
  <div className="bg-gray-900 p-6 rounded-xl border border-emerald-600 flex flex-col justify-center items-start shadow">
    <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </div>
);
