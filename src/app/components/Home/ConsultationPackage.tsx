'use client';

import React from 'react';
import GreenHeading from '../Custom_UI/GreenHeading';
import { CheckCircle, Stethoscope } from 'lucide-react';

const revenueModelPoints = [
    {
        text: <>We take a small <strong className="text-[#00c37a]">service fee from the doctor's consultation charge</strong></>,
    },
    {
        text: <>Patients may be charged a <strong className="text-[#00c37a]">minimal booking fee</strong> to confirm appointments</>,
    },
    {
        text: <>Doctors receive their consultation fee <strong className="text-[#00c37a]">directly after the session</strong></>,
    },
    {
        text: <>No hidden costs – <strong className="text-[#00c37a]">transparent pricing</strong> for both doctors and patients</>,
    },
];

const ConsultationPackage = () => {
    return (
        <section className="bg-[#0a0a0a] text-white py-16 container">
            <div className="container mx-auto px-4 text-center space-y-5">
                {/* Tag */}
                <div className='flex justify-center'>
                    <GreenHeading label="Affordable Healthcare" />
                </div>

                {/* Title */}
                <h2 className="text-4xl font-bold">Consultation Packages</h2>

                {/* Subtitle */}
                <p className="text-gray-400">
                    Choose a doctor and book your consultation — we keep it simple and transparent
                </p>

                {/* Card */}
                <div className="mt-10 bg-[#111] rounded-2xl border border-[#08392e] p-6 md:p-10 max-w-3xl mx-auto text-left space-y-6">
                    {/* Card Title */}
                    <div className="flex items-center gap-2 text-xl font-semibold text-white">
                        <Stethoscope className="text-[#00c37a]" size={20} />
                        <span className=" text-white px-2 py-1 rounded-sm">
                            How Our Pricing Works
                        </span>
                    </div>

                    {/* List */}
                    <ul className="space-y-4">
                        {revenueModelPoints.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-300 text-base">
                                <CheckCircle size={18} className="mt-1 text-[#00c37a]" />
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ConsultationPackage;
