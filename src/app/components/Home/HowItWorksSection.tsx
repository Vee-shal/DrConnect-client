"use client"
import { HowItWorksSectionData } from '@/app/utils/data'
import React from 'react'
import HowItWorksCard from './HowItWorksCard'

const HowItWorksSection = () => {
  return (
    <div className='text-center text-white space-y-6 p-8 bg-[#121212] container'>
        <div className='text-4xl font-bold'> How it works</div>
        <div className='text-[var(--color-text-light)] text-lg'>
            Our platform makes healthcare accessible with just a few clicks
        </div>
        <div className='flex flex-wrap gap-5 items-center justify-center '>
            {HowItWorksSectionData.map((item, index)=>{
                return <HowItWorksCard key={index} icon={item.icon} heading={item.heading} description={item.description} />
            })}
        </div>
    </div>
  )
}

export default HowItWorksSection