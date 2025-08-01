"use client"
import Image from 'next/image';
import React from 'react';

const HowItWorksCard = ({ icon, heading, description }: HowItWorksCardProp) => {
    return (
        <div className="text-start w-max bg-[#171717] border border-[var(--color-border)] text-[var(--color-text)] p-5 space-y-4 rounded-2xl shadow-md transition-all hover:border-[var(--color-button-hover)] hover:shadow-xl">
            <Image
                src={icon || "https://img.icons8.com/?size=100&id=Pn6usOP1InB5&format=png&color=000000"}
                alt=""
                height={1000}
                width={1000}
                className="h-12 w-12 object-contain bg-[var(--color-accent)] p-3 rounded-md"
            />
            <div className="text-xl font-semibold text-[var(--color-text)]">
                {heading}
            </div>
            <div className="text-md text-[var(--color-text-light)] max-w-sm">
                {description}
            </div>
        </div>
    );
};

export default HowItWorksCard;
