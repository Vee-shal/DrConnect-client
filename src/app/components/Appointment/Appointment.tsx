'use client';

import React, { useState } from 'react';

const AppointmentFormComponent = () => {
  const [reason, setReason] = useState('');
  const [mode, setMode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!mode) {
      alert('Please select consultation mode');
      return;
    }
    if (!reason.trim()) {
      alert('Please enter reason for appointment');
      return;
    }

    // TODO: send request to backend API with reason and mode
    console.log({ reason, mode });

    alert('Appointment request sent!');
    setReason('');
    setMode('');
  };

  return (
    <section className="container flex items-center justify-center bg-[#111] px-4 py-10">
      <div className="max-w-2xl w-full bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl p-8 space-y-8 shadow-2xl shadow-[#00c37a]/10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Book an Appointment</h2>
          <p className="text-[#00c37a] text-sm">Please fill out the details to schedule your visit</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mode of Consultation */}
          <div className="space-y-1">
            <label htmlFor="mode" className="block text-sm font-medium text-gray-300">Consultation Mode</label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
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
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe your symptoms or reason for appointment"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#08392e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c37a]/50"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#00c37a] to-[#00aa66] text-black font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Send Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default AppointmentFormComponent;
