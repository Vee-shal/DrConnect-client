import React from 'react'

const GreenHeading = ({ label }: { label: string }) => {
    return (
        <div className='bg-[#071F19] text-[#00D492] border-[0.1px] border-[#10531e] w-max px-4 py-2 rounded-md text-sm font-medium'>
            {label}
        </div>
    )
}

export default GreenHeading