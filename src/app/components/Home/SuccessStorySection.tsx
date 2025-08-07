'use client';

import React from 'react';
import SuccessStoryCard from './SuccessStoryCard';
import GreenHeading from '../Custom_UI/GreenHeading';
import { testimonialData } from '@/app/utils/data';

const SuccessStorySection = () => {
    return (
        <section className="py-16  text-center container bg-[#121212]">
            <div className="max-w-4xl mx-auto px-4">
                {/* Replaced span with GreenHeading */}
                <div className='flex justify-center'>
                    <GreenHeading label="Success Stories" />

                </div>
                <h2 className="text-4xl font-bold mt-4 text-white">What Our Users Say</h2>
                <p className=" mt-2 text-gray-300 text-md">
                    Hear from patients and doctors who use our platform
                </p>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 px-5 lg:px-0">
                {testimonialData.slice(0, 3).map((item, index) => (
                    <SuccessStoryCard
                        key={index}
                        name={item.name}
                        role={item.role}
                        desc={item.desc}
                    />
                ))}
            </div>
        </section>
    );
};

export default SuccessStorySection;
