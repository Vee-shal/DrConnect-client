"use client";

import React, { useEffect, useState } from "react";
import DoctorDashboard from "@/app/components/Dashboard/DoctorDashboard";
import PatientDashboard from "@/app/components/Dashboard/PatientDashboard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const parsedUser = JSON.parse(userString);
      setUser(parsedUser);
      setToken(parsedUser.token || null);
      console.log("✅ User:", parsedUser);
      setLoading(false);
    } else {
      console.log("❌ No user found in localStorage");
      router.push("/Login"); // Redirect if not logged in
    }
  }, [router]);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div>
      {user?.role === "doctor" ? (
        <DoctorDashboard user={user} token={token} />
      ) : (
        <PatientDashboard user={user} token={token} />
      )}
    </div>
  );
};

export default Dashboard;
