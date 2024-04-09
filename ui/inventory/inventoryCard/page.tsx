import { inventory } from '@prisma/client'
import React from 'react'

interface InventoryCardProps {
    inventory: inventory
    index: number
}

export default function InventoryCard({ inventory, index }: InventoryCardProps) {
    return (
        <div className='flex flex-row bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-4 transition duration-300 ease-in-out'>
            <div className='flex-1 text-gray-600 mr-4'>{index}</div>
            <div className='flex-1 text-gray-600 mr-4'>{inventory.name}</div>
        </div>
    )
}
