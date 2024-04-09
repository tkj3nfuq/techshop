'use client'

import React from 'react'
import SettingCard from './settingCard/page'
import { useSession } from 'next-auth/react'

export default function SettingPage() {
  const { data: user } = useSession();
  return (
    <div className='flex flex-col mx-10 mb-8 py-4 rounded-xl shadow-md bg-white h-full'>
      <SettingCard setting={user?.user.name}/>
    </div>
  )
}
