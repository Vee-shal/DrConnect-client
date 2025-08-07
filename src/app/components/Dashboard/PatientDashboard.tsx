"use client";
import React from "react";
import { FaUserMd, FaCalendarAlt, FaFilePrescription, FaHeartbeat } from "react-icons/fa";

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-emerald-400">Welcome, Patient 👋</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition">
          <FaUserMd className="text-3xl text-emerald-400 mb-2" />
          <h2 className="text-xl font-semibold">Assigned Doctor</h2>
          <p className="text-gray-400">Dr. Shoaib Raza</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition">
          <FaCalendarAlt className="text-3xl text-emerald-400 mb-2" />
          <h2 className="text-xl font-semibold">Next Appointment</h2>
          <p className="text-gray-400">08 Aug 2025 - 11:00 AM</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition">
          <FaFilePrescription className="text-3xl text-emerald-400 mb-2" />
          <h2 className="text-xl font-semibold">Prescriptions</h2>
          <p className="text-gray-400">3 Active</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition">
          <FaHeartbeat className="text-3xl text-emerald-400 mb-2" />
          <h2 className="text-xl font-semibold">Health Summary</h2>
          <p className="text-gray-400">Stable</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="col-span-2 bg-gray-800 p-6 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">Upcoming Appointments</h3>
          <ul className="space-y-4">
            <li className="bg-gray-700 p-4 rounded flex justify-between items-center">
              <span>Dental Checkup - Dr. Aisha</span>
              <span className="text-sm text-gray-300">10 Aug, 9:00 AM</span>
            </li>
            <li className="bg-gray-700 p-4 rounded flex justify-between items-center">
              <span>Eye Specialist - Dr. Vikram</span>
              <span className="text-sm text-gray-300">12 Aug, 3:30 PM</span>
            </li>
          </ul>
        </div>

        {/* Reminders */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-300 mb-4">Reminders</h3>
          <ul className="space-y-3">
            <li className="bg-gray-700 p-3 rounded">💊 Take BP Medicine - 9:00 AM</li>
            <li className="bg-gray-700 p-3 rounded">🚶‍♂️ Walk for 30 minutes</li>
            <li className="bg-gray-700 p-3 rounded">💧 Drink 2L Water</li>
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-10">
        <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-full text-white font-semibold transition">
          📅 Request New Appointment
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
