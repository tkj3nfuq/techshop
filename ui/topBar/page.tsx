'use client'

import { user } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React from 'react'

interface ProductNavBarProps {
  name: string;
}

export default function TopBar({ name }: ProductNavBarProps) {
  const { data: user } = useSession();

  return (
    <div className='flex items-center justify-between rounded-xl h-16 px-4 py-4 mx-3'>
      <div className='text-3xl font-extrabold text-blue-600'>{name}</div>
      <div
        className='flex items-center transition cursor-pointer duration-300 ease-in-out transform hover:scale-105'
        >
        <div className='text-lg text-blue-600 font-semibold mr-4'>Hi, {user?.user.name}!</div>
        <img
          src='https://via.placeholder.com/40'
          alt='User Avatar'
          className='w-10 h-10 rounded-full border-2 border-white'
        />
      </div>
    </div>
  )
}
