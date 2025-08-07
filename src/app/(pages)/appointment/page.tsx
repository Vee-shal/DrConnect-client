'use client';

import React from 'react';

const AppointmentFormComponent = () => {
  return (
    <section className="container flex items-center justify-center bg-[#111] px-4 py-10">
      <div className="max-w-2xl w-full bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl p-8 space-y-8 shadow-2xl shadow-[#00c37a]/10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Book an Appointment</h2>
          <p className="text-[#00c37a] text-sm">Please fill out the details to schedule your visit</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="9876543210"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
              <input
                id="date"
                type="date"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="time" className="block text-sm font-medium text-gray-300">Time</label>
              <input
                id="time"
                type="time"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
              />
            </div>
          </div>

          {/* Mode of Consultation */}
          <div className="space-y-1">
            <label htmlFor="mode" className="block text-sm font-medium text-gray-300">Consultation Mode</label>
            <select
              id="mode"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
            >
              <option value="">Select</option>
              <option value="offline">In-Person</option>
              <option value="online">Online (Video Call)</option>
            </select>
          </div>

          {/* Reason for Visit */}
          <div className="space-y-1">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-300">Symptoms / Reason</label>
            <textarea
              id="reason"
              rows={4}
              placeholder="Describe your symptoms or reason for appointment"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
            ></textarea>
          </div>

          {/* Doctor Selection */}
          <div className="space-y-1">
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-300">Select Doctor</label>
            <select
              id="doctor"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
            >
              <option value="">Choose Doctor</option>
              <option value="dr-singh">Dr. Singh – Cardiologist</option>
              <option value="dr-mehra">Dr. Mehra – Neurologist</option>
              <option value="dr-kapoor">Dr. Kapoor – General Physician</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
};

export default AppointmentFormComponent;
