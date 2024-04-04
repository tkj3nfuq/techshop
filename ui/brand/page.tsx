'use client'

import { brand } from '@prisma/client'
import React from 'react'
import BrandCard from './brandCard/page'
import { useRouter } from 'next/navigation';

export default function BrandPage() {
    const router = useRouter(); 
    const [brands, setBrands] = React.useState([] as brand[])

    React.useEffect(() => {
        fetch('/api/brands')
        .then(data => data.json())
        .then((data) => setBrands(data))
    }, [])

    return (
        <div className='flex flex-col bg-slate-50 h-full'>
            <button
                className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 mr-6 mt-4 mx-10 rounded-xl'
                onClick={() => {router.push('/brands/add')}}
            >New Brand +</button>
            <ul className="mb-4 mx-10 mt-4">
                <li className="flex bg-white py-2 px-4">
                    <div className="flex-1 text-black font-semibold">Order</div>
                    <div className="flex-1 text-black font-semibold">Brand's Name</div>
                    <div className="flex-1 text-black font-semibold">Email</div>
                    <div className="flex-1 text-black font-semibold">Phone Number</div>
                </li>
            </ul>
            <ul>
                {brands.map((brand, index) => (
                    <li className='flex flex-col mx-10'>
                        <BrandCard brand={brand} index={index+1} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
