'use client';

import React from 'react';
import CustomButton from '../Custom_UI/CustomButton';

const ReadySection = () => {
    return (
        <div className="bg-black py-4 px-2 sm:px-6">
            <section className="bg-gradient-to-r from-[#08231B] to-[#081511] px-4 sm:px-6 md:px-10 py-10 sm:py-16 md:py-20 rounded-2xl text-left m-2 sm:m-4 md:m-6">
                <div className="max-w-2xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                        Ready to take control of your <br className="hidden sm:block" />
                        healthcare?
                    </h2>
                    <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">
                        Join thousands of users who have simplified their healthcare journey with our
                        platform. Get started today and experience healthcare the way it should be.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <CustomButton onClick={() => {}} text="Sign Up Now" variant="contained" />
                        <CustomButton onClick={() => {}} text="View Pricing" variant="outlined" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReadySection;
