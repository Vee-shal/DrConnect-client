    import React from 'react';

    type propType = {
        role : string,
        desc : string,
        name : string,
    }

    const SuccessStoryCard = ({ name, role, desc } : propType) => {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <div className="bg-[#111111] text-start border border-[#1F1F1F] text-white rounded-xl p-6 max-w-md w-full shadow-sm">
        {/* Avatar and Info */}
        <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-green-500 font-semibold">
            {initials.slice(0,2)}
            </div>
            <div>
            <div className="font-semibold capitalize">{name}</div>
            <div className="text-md text-gray-400 capitalize">{role}</div>
            </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed text-md">
            "{desc}"
        </p>
        </div>
    );
    };

    export default SuccessStoryCard;
