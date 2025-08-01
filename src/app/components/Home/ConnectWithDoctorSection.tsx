'use client'

import React from 'react';
import Image from 'next/image';
import CustomButton from '../Custom_UI/CustomButton';

const ConnectWithDoctorSection = () => {
    return (
        <section className="bg-black text-white py-20">
            <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-y-10 ">
                {/* Left Text Content */}
                <div className="space-y-6">
                    <div className="bg-[#014F37] text-sm px-4 py-2 w-max rounded-md font-medium tracking-wide">
                        Healthcare made simple
                    </div>

                    <h1 className="text-5xl font-bold leading-tight">
                        Connect with doctors <br />
                        <span className="text-[#00C896]">anytime, anywhere</span>
                    </h1>

                    <p className="text-lg text-[#CCCCCC]">
                        Book appointments, consult via video, and manage your healthcare journey all in one secure platform.
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-2">
                        <CustomButton
                            variant="contained"
                            text="Get Started"
                            onClick={() => {}}
                            icon="/icons/arrow-right.svg"
                        />
                        <CustomButton
                            variant="outlined"
                            text="Find Doctors"
                            onClick={() => {}}
                        />
                    </div>
                </div>

                {/* Doctor Image */}
                <div className="max-w-md">
                    <Image
                        src="/banner2.webp"
                        alt="Doctors"
                        width={800}
                        height={800}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default ConnectWithDoctorSection;
