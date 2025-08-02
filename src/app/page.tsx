"use client";
import React, { useEffect, useState } from "react";

import HowItWorksSection from "./components/Home/HowItWorksSection";
import ConsultationPackage from "./components/Home/ConsultationPackage";
import SuccessStorySection from "./components/Home/SuccessStorySection";
import ReadySection from "./components/Home/ReadySection";
import ConnectWithDoctorSection from "./components/Home/ConnectWithDoctorSection";
import CustomLoader from "./components/Custom_UI/CustomLoader"; 

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CustomLoader />;

  return (
    <div className="container">
      <ConnectWithDoctorSection />
      <HowItWorksSection />
      <ConsultationPackage />
      <SuccessStorySection />
      <ReadySection />
    </div>
  );
};

export default Page;
