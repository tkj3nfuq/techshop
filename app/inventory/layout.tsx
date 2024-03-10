import SideBar from '@/ui/sidebar/page'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-row'>
        <div className='z-50 w-64 h-screen'>
            <SideBar />
        </div>
        <div className="-ms-8 w-full flex flex-col">
            {children}
        </div>
    </div>
  )
}
