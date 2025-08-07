'use client';

import React from 'react';
import { BriefcaseBusiness, Lightbulb, UserRound } from 'lucide-react';
import GreenHeading from '@/app/components/Custom_UI/GreenHeading';
import { teamMembers } from '@/app/utils/data';


const AboutUs = () => {
  return (
    <section className="bg-[#0a0a0a] text-white py-16 container">
      <div className="  px-4 space-y-20">
        {/* Introduction */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <GreenHeading label="Who We Are" />
          </div>
          <h2 className="text-4xl font-bold">About DrConnect</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            DrConnect is an end-to-end doctor consultation platform where patients can easily discover, connect, and consult with verified doctors. We aim to bridge the gap between healthcare providers and patients using seamless digital experiences.
          </p>
        </div>

        {/* Meet the Team */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <GreenHeading label="Meet the Team" />
          </div>
          <h2 className="text-4xl font-bold">The Minds Behind the Idea</h2>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[#111] border border-[#08392e] rounded-xl p-6 text-left w-full md:w-[300px] space-y-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <UserRound className="text-[#00c37a]" size={24} />
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                </div>
                <p className="text-[#00c37a] font-medium">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-[#111] rounded-2xl border border-[#08392e] p-6 md:p-10 max-w-4xl mx-auto text-left space-y-6">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <BriefcaseBusiness className="text-[#00c37a]" size={22} />
            <span className="text-white">Our Vision</span>
          </div>
          <p className="text-gray-300 text-base">
            At DrConnect, our vision is to transform the way people access healthcare. We strive to create a platform where technology empowers patients, not complicates their journey. We believe that quality medical consultation should be available at your fingertips — regardless of where you live or what device you use. 
            <br /><br />
            By combining intuitive user experience with reliable backend infrastructure, we’re building a healthcare experience that feels personal, safe, and effortless. We are committed to constantly evolving, learning from real patient needs, and enabling doctors to connect meaningfully with their patients — all through a secure and scalable system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
