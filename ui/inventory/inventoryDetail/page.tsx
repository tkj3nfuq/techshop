import { inventory, product } from '@prisma/client'
import React from 'react'
import ProductInventoryCard from './productInventoryCard/page';
import { useRouter } from 'next/navigation';

interface InventoryDetailProps {
    inventoryID: string
}

export default function InventoryDetail({ inventoryID }: InventoryDetailProps) {
    const router = useRouter();

    const [inventory, setInventory] = React.useState<inventory>({} as inventory);

    React.useEffect(() => {
        fetch('/api/inventory/' + inventoryID)
            .then((data) => data.json())
            .then((data) => setInventory(data))
    }, [])

    return (
        <div className='flex flex-col mx-10 mt-2 mb-8 rounded-xl shadow-md bg-white h-full'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-bold text-black mx-10 mt-4'>{inventory.name}</h1>
                <button
                    className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 mr-10 mt-4 mx-10 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
                    onClick={() => { router.push('/inventory/' + inventoryID + '/addNewProduct') }}
                >Add Product +</button>
            </div>
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
