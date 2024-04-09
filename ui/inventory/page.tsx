'use client'

import { inventory } from '@prisma/client'
import React from 'react'
import InventoryCard from './inventoryCard/page'

export default function InventoryTable() {
    const [inventories, setInventories] = React.useState([] as inventory[])

    React.useEffect(() => {
        fetch('/api/inventory')
            .then((res) => res.json())
            .then(data => setInventories(data))
    }, [])

    return (
        <div className='flex flex-col mx-10 mt-2 mb-8 rounded-xl shadow-md bg-white h-full'>
            <ul className="mb-4 mx-10 mt-4">
                <li className="flex bg-white py-2 px-4">
                    <div className="flex-1 text-black font-semibold">Number</div>
                    <div className="flex-1 text-black font-semibold">Inventory Name</div>
                </li>
            </ul>
            <ul>
                {inventories.map((inventory, index) => (
                    <li className='flex flex-col mx-10'>
                        <InventoryCard inventory={inventory} index={index + 1} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
