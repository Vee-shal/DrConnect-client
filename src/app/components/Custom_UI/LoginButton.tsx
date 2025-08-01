import Image from 'next/image'
import React from 'react'

const LoginButton = ({ text, icon, onClick }: CustomButtonProp) => {
  return (
    <div onClick={onClick} className='flex bg-amber-400 px-2 py-1 rounded-lg gap-2 justify-center items-center shadow-amber-400'>
      <Image src={icon || "https://img.icons8.com/?size=100&id=Pn6usOP1InB5&format=png&color=000000"} height={1000} width={1000} alt='' className='h-7 w-7' />
      <div>
        {text}
      </div>
    </div>
  )
}

export default LoginButton