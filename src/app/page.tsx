import React from 'react'
import Header from './components/Header/Header'
import HowItWorksCard from './components/Home/HowItWorksCard'

const page = () => {
  return (
    <div className='p-10 bg-[var(--color-bg-alt)]   '><HowItWorksCard icon='' heading='Create Your Profile' description='Sign up and complete your profile to get personalized healthcare recommendations and services.'/></div>
  )
}

export default page