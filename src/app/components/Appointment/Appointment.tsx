"use client";

import { _makePostRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import React, { useState } from "react";
import { toast } from "react-hot-toast";


interface AppointmentFormProps {
  patientId: number | any;
  doctorId: number;
  onClose?: () => void; 
}

const AppointmentFormComponent = ({ patientId, doctorId, onClose }: AppointmentFormProps) => {
  const [reason, setReason] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mode) {
      toast.error("Please select consultation mode");
      return;
    }
    if (!reason.trim()) {
      toast.error("Please enter reason for appointment");
      return;
    }

    setLoading(true);
    try {
      const res = await _makePostRequest(endpoints.APPOINTMENT.REQUEST, {
        patientId,
        doctorId,
        reason,
        mode,
      });

      toast.success("Appointment request sent!");
      setReason("");
      setMode("");

      if (onClose) onClose(); // close modal after success
    } catch (error) {
      console.error(error);
      toast.error("Failed to send appointment request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container flex items-center justify-center bg-[#111] px-4 py-10">
      <div className="max-w-2xl w-full bg-[#111]/90 backdrop-blur-sm border border-[#00c37a]/20 rounded-2xl p-8 space-y-8 shadow-2xl shadow-[#00c37a]/10">
        {/* Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Book an Appointment</h2>
          <p className="text-[#00c37a] text-sm">
            Please fill out the details to schedule your visit
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mode of Consultation */}
          <div className="space-y-1">
            <label
              htmlFor="mode"
              className="block text-sm font-medium text-gray-300"
            >
              Consultation Mode
            </label>
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
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-300"
            >
              Symptoms / Reason
            </label>
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
