"use client";
import { _makeGetRequest, _makePostRequest } from "@/app/lib/api/api";
import { endpoints } from "@/app/lib/api/endpoints";
import { useAuthStore } from "@/app/lib/store/authStore";
import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

type Appointment = {
  id: number | string;
  date: string;
  time: string;
  mode: "Online" | "Offline";
  patientName: string;
  status: "Pending" | "Accepted" | "Rejected" | "Completed";
  reason: string;
  patient: {
    name: string;
    email: string;
  } | null;
};

const DoctorTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const user = useAuthStore((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHours, setSelectedHours] = useState("10");
  const [selectedMinutes, setSelectedMinutes] = useState("00");
  const [selectedStatus, setSelectedStatus] =
    useState<Appointment["status"]>("Pending");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = React.useRef<Toast>(null);

  const Status = ["All", "Pending", "Accepted", "Rejected", "Completed"];
  const Time = ["All", "Today", "Week", "Month"];
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeTime, setActiveTime] = useState("All");

  const showToast = (
    severity: "success" | "error",
    summary: string,
    detail: string
  ) => {
    toast.current?.show({ severity, summary, detail, life: 3000 });
  };

  const handleRequest = async () => {
    setIsLoading(true);
    try {
      const params = {
        doctorId: user?.id,
        status: activeStatus === "All" ? "" : activeStatus,
        time: activeTime === "All" ? "" : activeTime,
      };

      const res = await _makeGetRequest(
        endpoints.APPOINTMENT.GET_APPOINTMENTS,
        params
      );

      const normalizedAppointments = res.data.map((appt: any) => ({
        ...appt,
        time: appt.time?.includes(":") ? appt.time : "10:00",
      }));

      setAppointments(normalizedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showToast("error", "Error", "Failed to fetch appointments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    handleRequest();
  }, [activeTime, activeStatus, user?.id]);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const openEditModal = (appointment: Appointment) => {
    try {
      setCurrentAppointment(appointment);

      const validDate = appointment.date
        ? new Date(appointment.date)
        : new Date();
      setSelectedDate(validDate);

      const timeParts = (appointment.time || "10:00").toString().split(":");
      const hours = timeParts[0]?.padStart(2, "0") || "10";
      const minutes = timeParts[1]?.padStart(2, "0") || "00";

      setSelectedHours(hours);
      setSelectedMinutes(minutes);

      setVisible(true);
    } catch (error) {
      console.error("Error opening edit modal:", error);
      setSelectedDate(new Date());
      setSelectedHours("10");
      setSelectedMinutes("00");
      setVisible(true);
    }
  };

  const handleSave = async () => {
    if (!currentAppointment || !selectedDate || !user?.email) {
      showToast("error", "Error", "Missing required information");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        scheduledAt: `${
          selectedDate.toISOString().split("T")[0]
        }T${selectedHours}:${selectedMinutes}:00.000Z`,
        appointmentId: currentAppointment.id,
        status: selectedStatus,
        doctorEmail: user.email,
        patientEmail: currentAppointment.patient?.email || "",
        mode: currentAppointment.mode,
      };

      const response = await _makePostRequest(
        endpoints.APPOINTMENT.UPDATE_APPOINTMENT,
        payload
      );

      if (!response.success) {
        throw new Error(response.message || "Failed to update appointment");
      }

      const updatedAppointments = appointments.map((appt) =>
        appt.id === currentAppointment.id
          ? {
              ...appt,
              date: selectedDate.toISOString().split("T")[0],
              time: `${selectedHours}:${selectedMinutes}`,
              status: selectedStatus,
            }
          : appt
      );

      setAppointments(updatedAppointments);
      setVisible(false);
      showToast("success", "Success", "Appointment updated successfully");
    } catch (error) {
      console.error("Error updating appointment:", error);
      showToast("error", "Error", "Failed to update appointment");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-900/50 text-yellow-300";
      case "Accepted":
        return "bg-blue-900/50 text-blue-300";
      case "Rejected":
        return "bg-red-900/50 text-red-300";
      case "Completed":
        return "bg-green-900/50 text-green-300";
      default:
        return "bg-gray-900/50 text-gray-300";
    }
  };

  const modalFooter = (
    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 my-5 pr-2">
      <button
        onClick={() => setVisible(false)}
        disabled={isSaving}
        className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#333] hover:bg-[#444] text-white transition-colors duration-200 ease-in-out shadow-md disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`w-full sm:w-auto px-6 py-3 rounded-lg ${
          isSaving ? "bg-[#1ebc8b]/70" : "bg-[#1ebc8b] hover:bg-[#18a77a]"
        } text-gray-900 font-semibold transition-colors duration-200 ease-in-out shadow-md disabled:opacity-70 flex items-center justify-center`}
      >
        {isSaving ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );

  return (
    <div className="container bg-[#111] p-6 min-h-[45.8vh] shadow-xl border border-[#1ebc8b]/20 text-white">
      <Toast ref={toast} position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-3xl">
            Hello,{" "}
            <span className="text-[#1ebc8b] text-2xl">
              {user?.name || "Doctor"}
            </span>
          </h2>
          <p className="text-sm text-gray-400 mt-5">
            Your patient appointments
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              Status
            </span>
            <div className="flex flex-wrap gap-1">
              {Status.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveStatus(filter)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all
                    ${
                      activeStatus === filter
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
            <span className="text-xs font-semibold text-gray-400 uppercase">
              Time
            </span>
            <div className="flex flex-wrap gap-1">
              {Time.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveTime(filter)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all
                    ${
                      activeTime === filter
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1ebc8b]"></div>
        </div>
      )}

      {/* Desktop Table */}
      {!isLoading && (
        <>
          <div className="overflow-x-auto hidden lg:block rounded-lg border border-[#1ebc8b]/20 shadow-lg">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#1ebc8b]/10 backdrop-blur-sm">
                <tr>
                  {[
                    "ID",
                    "Patient",
                    "Reason",
                    "Date",
                    "Time",
                    "Mode",
                    "Status",
                    "Actions",
                  ].map((header) => (
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
                        {appt.patient?.name || "Not Available"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {appt.reason || "Not Available"}
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
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                            appt.status
                          )}`}
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
                    <td
                      colSpan={8}
                      className="px-6 py-4 text-center text-sm text-gray-400"
                    >
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
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(
                        appt.status
                      )}`}
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
                        className={`text-xs px-2 py-1 rounded-full ${
                          appt.mode === "Online"
                            ? "bg-blue-900/50 text-blue-300"
                            : "bg-purple-900/50 text-purple-300"
                        }`}
                      >
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
        </>
      )}

      {/* Edit Modal */}
      <Dialog
        visible={visible}
        onHide={() => !isSaving && setVisible(false)}
        footer={modalFooter}
        className="bg-[#222] border border-[#1ebc8b]/40 rounded-lg shadow-xl max-w-sm w-full sm:max-w-md"
        contentClassName="backdrop-blur-sm bg-[#111]/95 p-4 sm:p-6 max-h-[60vh] overflow-y-auto"
        headerClassName="border-b border-[#1ebc8b]/40 p-3 sm:p-4"
        header={
          <h3 className="text-lg sm:text-xl font-semibold text-[#1ebc8b] tracking-wide truncate">
            Edit Appointment {currentAppointment?.patientName}
          </h3>
        }
      >
        <div className="space-y-4 sm:space-y-6">
          {/* Date Field */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 tracking-wide">
              Date
            </label>
            <Calendar
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.value as Date)}
              dateFormat="yy-mm-dd"
              className="w-full bg-[#333] border border-[#1ebc8b]/40 text-white rounded-md py-1.5 px-2 pr-10 text-sm sm:text-base transition focus:outline-none focus:ring-2 focus:ring-[#1ebc8b]"
              panelClassName="bg-[#333] border border-[#1ebc8b]/40 shadow-lg rounded-md"
              showIcon
              disabled={isSaving}
            />
          </div>

          {/* Time Field */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 tracking-wide">
              Time (24-hour format)
            </label>
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4">
              <select
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
                className="w-full sm:flex-1 bg-[#333] border border-[#1ebc8b]/40 text-white rounded-md px-3 py-1.5 text-sm sm:text-base transition focus:outline-none focus:ring-2 focus:ring-[#1ebc8b]"
                disabled={isSaving}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span className="text-gray-300 text-base sm:text-lg select-none hidden sm:block">
                :
              </span>
              <select
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(e.target.value)}
                className="w-full sm:flex-1 bg-[#333] border border-[#1ebc8b]/40 text-white rounded-md px-3 py-1.5 text-sm sm:text-base transition focus:outline-none focus:ring-2 focus:ring-[#1ebc8b]"
                disabled={isSaving}
              >
                {minutes.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Field */}
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-semibold text-gray-300 tracking-wide">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as Appointment["status"])
              }
              className="w-full bg-[#333] border border-[#1ebc8b]/40 text-white rounded-md px-3 py-1.5 text-sm sm:text-base transition focus:outline-none focus:ring-2 focus:ring-[#1ebc8b]"
              disabled={isSaving}
            >
              {Status.filter((s) => s !== "All").map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DoctorTable;
