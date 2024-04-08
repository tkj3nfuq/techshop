import React from 'react'

interface ProductNavBarProps {
  name: string;
}

export default function ProductNavBar({ name }: ProductNavBarProps) {
  return (
    <div className='flex bg-black flex-row w-full h-11 py-1 justify-between'>
        <div className='text-white font-bold text-2xl ml-4'>{name}</div>
        <div className='text-white font-bold text-2xl mr-4'>UserName</div>
    </div>
  )
}
