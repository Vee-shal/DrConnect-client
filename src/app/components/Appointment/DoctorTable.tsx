"use client";
import { _makeGetRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import { useAuthStore } from "@/app/lib/store/authStore";
import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';

type Appointment = {
  id: number | string;
  date: string;
  time: string;
  mode: "Online" | "Offline";
  patientName: string;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  reason: string;
};

const DoctorTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const user = useAuthStore((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHours, setSelectedHours] = useState('10');
  const [selectedMinutes, setSelectedMinutes] = useState('00');
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const Status = ["All", "Pending", "Accepted", "Rejected", "Completed"];
  const Time = ["All", "Today", "Week", "Month"];
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeTime, setActiveTime] = useState("All");

  const handleRequest = async () => {
    try {
      const params = {
        doctorId: user?.id,
        status: activeStatus === "All" ? "" : activeStatus,
        time: activeTime === "All" ? "" : activeTime
      };

      const res = await _makeGetRequest(endpoints.APPOINTMENT.GET_APPOINTMENTS, params);
      
      // Normalize appointment data
      const normalizedAppointments = res.data.map((appt: any) => ({
        ...appt,
        time: appt.time?.includes(':') ? appt.time : '10:00' // Default time if invalid
      }));
      
      setAppointments(normalizedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    handleRequest();
  }, [activeTime, activeStatus, user?.id]);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const openEditModal = (appointment: Appointment) => {
    try {
      setCurrentAppointment(appointment);
      setSelectedDate(new Date(appointment.date));
      
      // Safe time splitting with fallbacks
      const timeParts = (appointment.time || '10:00').toString().split(':');
      const hours = timeParts[0]?.padStart(2, '0') || '10';
      const minutes = timeParts[1]?.padStart(2, '0') || '00';
      
      setSelectedHours(hours);
      setSelectedMinutes(minutes);
      setSelectedStatus(appointment.status || 'Pending');
      setVisible(true);
    } catch (error) {
      console.error('Error opening edit modal:', error);
      // Fallback values
      setSelectedHours('10');
      setSelectedMinutes('00');
      setSelectedStatus('Pending');
      setVisible(true);
    }
  };

  const handleSave = () => {
    if (currentAppointment && selectedDate) {
      const updatedAppointments = appointments.map(appt => 
        appt.id === currentAppointment.id ? {
          ...appt,
          date: selectedDate.toISOString().split('T')[0],
          time: `${selectedHours}:${selectedMinutes}`,
          status: selectedStatus as Appointment['status']
        } : appt
      );
      setAppointments(updatedAppointments);
      setVisible(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending': return "bg-yellow-900/50 text-yellow-300";
      case 'Accepted': return "bg-blue-900/50 text-blue-300";
      case 'Rejected': return "bg-red-900/50 text-red-300";
      case 'Completed': return "bg-green-900/50 text-green-300";
      default: return "bg-gray-900/50 text-gray-300";
    }
  };

  const modalFooter = (
    <div className="flex justify-end gap-2">
      <button 
        onClick={() => setVisible(false)} 
        className="px-4 py-2 rounded-lg bg-[#333] hover:bg-[#444] text-white"
      >
        Cancel
      </button>
      <button 
        onClick={handleSave} 
        className="px-4 py-2 rounded-lg bg-[#1ebc8b] hover:bg-[#18a77a] text-gray-900 font-medium"
      >
        Save Changes
      </button>
    </div>
  );

  return (
    <div className="container bg-[#111] p-6 min-h-[45.8vh] shadow-xl border border-[#1ebc8b]/20 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-3xl">
            Hello, <span className="text-[#1ebc8b] text-2xl">{user?.name || "Doctor"}</span>
          </h2>
          <p className="text-sm text-gray-400 mt-5">Your patient appointments</p>
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
                      : "bg-[#222] text-gray-300 hover:bg-[#333]"
                    }`}
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
                      : "bg-[#222] text-gray-300 hover:bg-[#333]"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden lg:block rounded-lg border border-[#1ebc8b]/20 shadow-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#1ebc8b]/10 backdrop-blur-sm">
            <tr>
              {["Appointment ID", "Patient", "Date", "Time", "Mode", "Status", "Actions"].map((header) => (
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
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr
                  key={appt.id}
                  className="hover:bg-[#1ebc8b]/10 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                    #{appt.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {appt.patientName || "Not Available"}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        getStatusBadge(appt.status)
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(appt)}
                      className="text-[#1ebc8b] hover:text-[#18a77a]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-400">
                  You have no appointments for this filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <div
              key={appt.id}
              className="p-4 rounded-lg border border-[#1ebc8b]/20 bg-[#1a1a1a] hover:bg-[#1ebc8b]/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-[#1ebc8b] capitalize">
                  {appt.patientName || "Unknown Patient"}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(appt.status)}`}>
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
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appt.mode === "Online" 
                      ? "bg-blue-900/50 text-blue-300" 
                      : "bg-purple-900/50 text-purple-300"
                  }`}>
                    {appt.mode}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400">Appointment ID</p>
                  <p>#{appt.id}</p>
                </div>
              </div>
              <div className="mt-3 text-right">
                <button
                  onClick={() => openEditModal(appt)}
                  className="text-[#1ebc8b] hover:text-[#18a77a] text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 rounded-lg border border-[#1ebc8b]/20 bg-[#1a1a1a] text-center text-gray-400">
            You have no appointments for this filter
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog 
        visible={visible} 
        onHide={() => setVisible(false)} 
        footer={modalFooter}
        className="bg-[#222] border border-[#1ebc8b]/30 rounded-lg shadow-2xl"
        contentClassName="backdrop-blur-sm bg-[#111]/90 p-6"
        headerClassName="border-b border-[#1ebc8b]/30 p-6"
        header={
          <h3 className="text-xl font-semibold text-[#1ebc8b]">
            Edit Appointment {currentAppointment?.patientName}
          </h3>
        }
      >
        <div className="space-y-6">
          {/* Date Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Date</label>
            <Calendar
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value as Date)}
              dateFormat="yy-mm-dd"
              className="w-full bg-[#333] border border-[#1ebc8b]/30 text-white rounded-lg py-2 pl-3 pr-10"
              panelClassName="bg-[#333] border border-[#1ebc8b]/30 shadow-lg"
              showIcon
            />
          </div>
          
          {/* Time Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Time (24-hour format)</label>
            <div className="flex items-center gap-3">
              <select
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
                className="flex-1 bg-[#333] border border-[#1ebc8b]/30 text-white rounded-lg px-4 py-2"
              >
                {hours.map(hour => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <span className="text-gray-300">:</span>
              <select
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(e.target.value)}
                className="flex-1 bg-[#333] border border-[#1ebc8b]/30 text-white rounded-lg px-4 py-2"
              >
                {minutes.map(minute => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Status Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#333] border border-[#1ebc8b]/30 text-white rounded-lg px-4 py-2"
            >
              {Status.filter(s => s !== "All").map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DoctorTable;