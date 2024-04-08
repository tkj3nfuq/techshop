import ProductNavBar from '@/ui/topBar/page'
import SideBar from '@/ui/sidebar/page'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-row'>
        {children}
    </div>
  )
}
