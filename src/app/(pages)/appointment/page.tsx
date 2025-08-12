"use client"
import DoctorTable from '@/app/components/Appointment/DoctorTable';
import PatientTable from '@/app/components/Appointment/PatientTable';
import { useAuthStore } from '@/app/lib/store/authStore'
import React from 'react'

const page = () => {
  const user = useAuthStore((state) => state.user);
  return <>
    {user?.role === "user" ? <PatientTable /> : <DoctorTable />}
  </>
}

export default page