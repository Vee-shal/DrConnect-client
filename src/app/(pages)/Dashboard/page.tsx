"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DoctorDashboard from "@/app/components/Dashboard/DoctorDashboard";
import PatientDashboard from "@/app/components/Dashboard/PatientDashboard";
import { useAuthStore } from "@/app/lib/store/authStore";

const Dashboard = () => {
  const router = useRouter();
  const { user, token, isHydrated } = useAuthStore();
  if (!isHydrated) {
    return <div className="text-center py-10">Loading state...</div>;
  }

  if (!user || !token) {
    console.log("❌ No user/token found in Zustand store");
    router.push("/login"); 
    return null;
  }

  return (
    <div>
      {user.role === "doctor" ? (
        <DoctorDashboard user={user} token={token} />
      ) : (
        <PatientDashboard user={user} token={token} />
      )}
    </div>
  );
};

export default Dashboard;
