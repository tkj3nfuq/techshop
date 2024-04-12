'use client'

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react'

interface ProductNavBarProps {
  name: string;
}

export default function TopBar({ name }: ProductNavBarProps) {
  const router = useRouter();
  const { data: user } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
    router.push('/login');
  };

  const handleProfile = () => {
    // Redirect to user's profile page or show profile details
  };

  return (
    <div className='flex items-center justify-between rounded-xl h-16 px-4 py-4 mx-3'>
      <div className='text-3xl font-extrabold text-blue-600'>{name}</div>
      <div className='relative' ref={dropdownRef}>
        <div
          className='flex items-center transition cursor-pointer duration-300 ease-in-out transform hover:scale-105'
          onClick={toggleDropdown}
        >
          <div className='text-lg text-blue-600 font-semibold mr-4'>Hi, {user?.user.name}!</div>
          <img
            src='https://via.placeholder.com/40'
            alt='User Avatar'
            className='w-10 h-10 rounded-full border-2 border-white'
          />
        </div>
        {isDropdownOpen && (
          <div className='absolute top-12 right-0 bg-white shadow-md rounded-md p-2 z-50'>
            <button onClick={handleProfile} className='block w-full text-black text-left py-2 px-4 hover:bg-gray-100 duration-300 ease-in-out transform hover:scale-105'>
              Profile
            </button>
            <button onClick={handleLogout} className='block w-full text-black text-left py-2 px-4 hover:bg-gray-100 duration-300 ease-in-out transform hover:scale-105'>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
