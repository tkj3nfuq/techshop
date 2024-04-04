import { brand } from '@prisma/client'
import React from 'react'

interface BrandCardProps {
    brand: brand,
    index: number
}

export default function BrandCard({ brand, index }: BrandCardProps) {
    return (
        <div className='flex flex-row bg-white hover:bg-zinc-300 cursor-pointer shadow-md rounded-lg p-4 mb-4'>
            <div className='flex-1 text-gray-600 mr-4'>{index}</div>
            <div className='flex-1 text-gray-600 mr-4'>{brand.name}</div>
            <div className='flex-1 text-gray-600 mr-4'>sample@gm.com</div>
            <div className='flex-1 text-gray-600'>0888888888</div>
        </div>
    )
}
