import React from 'react'
import Header from './components/Header/Header'
import HowItWorksSection from './components/Home/HowItWorksSection'
import ConsultationPackage from './components/Home/ConsultationPackage'
import SuccessStorySection from './components/Home/SuccessStorySection'
import ReadySection from './components/Home/ReadySection'
import ConnectWithDoctorSection from './components/Home/ConnectWithDoctorSection'

const page = () => {
  return (
    <div className='  container '>
      <ConnectWithDoctorSection />
      <HowItWorksSection />
      <ConsultationPackage />
      <SuccessStorySection />
      <ReadySection />
    </div>
  )
}

export default page;
