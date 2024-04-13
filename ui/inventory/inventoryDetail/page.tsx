import { inventory, product } from '@prisma/client'
import React from 'react'
import ProductInventoryCard from './productInventoryCard/page';

interface InventoryDetailProps {
    inventoryID: string
}

export default function InventoryDetail({ inventoryID }: InventoryDetailProps) {
    const [inventory, setInventory] = React.useState<inventory>({} as inventory);

    React.useEffect(() => {
        fetch('/api/inventory/' + inventoryID)
            .then((data) => data.json())
            .then((data) => setInventory(data))
    }, [])

    return (
        <div className='flex flex-col mx-10 mt-2 mb-8 rounded-xl shadow-md bg-white h-full'>
            <ul className="mb-4 mx-10 mt-4">
                <li className="flex bg-white py-2 px-4">
                    <div className="flex-1 text-black font-semibold">Number</div>
                    <div className="flex-1 text-black font-semibold">Product's Name</div>
                    <div className="flex-1 text-black font-semibold">Price</div>
                    <div className="flex-1 text-black font-semibold">Quantity</div>
                </li>
            </ul>
            <ul>
                {inventory.productList?.map((product, index) => (
                    <li className='flex flex-col mx-10' key={index}>
                        <ProductInventoryCard product={product.product} index={index + 1} quantity={product.quantity} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
