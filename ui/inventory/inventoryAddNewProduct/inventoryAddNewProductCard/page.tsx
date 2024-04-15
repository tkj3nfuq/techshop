import { product } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React from 'react'
import Popup from 'reactjs-popup';

interface InventoryAddNewProductCardProps {
    product: product;
    index: number
}

export default function InventoryAddNewProductCard({ product, index }: InventoryAddNewProductCardProps) {
    const router = useRouter();
    
    const url = new URL(window.location.href);
    const inventoryID = url.pathname.split('/')[2];
    console.log(inventoryID);

    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value));
    }

    const handleAddProduct = () => {
        if (quantity > 0) {
            fetch(`/api/inventory/${inventoryID}`, {
                method: 'PUT',
                body: JSON.stringify({
                    product: product.id,
                    quantity: quantity
                })
            }).then(response => {
                if (response.ok) {
                    setOpen(false);
                }
            })
            router.push(`/inventory/${inventoryID}`)
        }
        else {
            alert('Quantity must be greater than 0.');
        }
    }

    return (
        <div
            className='flex flex-row w-full bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-4 transition duration-300 ease-in-out'
            onClick={() => { setOpen(true) }}>
            <div className='flex-1 text-gray-600 mr-4'>{index}</div>
            <div className='flex-1 text-gray-600 mr-4'>{product.name}</div>
            <Popup
                open={open}
                onClose={() => setOpen(false)}
                closeOnDocumentClick
                modal
                overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className='modal flex flex-col text-black bg-white p-3 rounded-xl max-w-3xl'>
                    <div className='flex flex-row justify-between mb-2 '>
                        <div className='header font-bold text-xl'>Inventory Add New Product</div>
                        <button className='self-end close bg-blue-600 rounded-xl h-6 w-6 text-white text-center justify-center items-center transition duration-300 ease-in-out transform hover:scale-105' onClick={() => setOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className='content flex mx-1.5'>
                        <table className='mb-2'>
                            <tbody>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Name: </td>
                                    <td className='py-2 px-4'>{product.name}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Quantity: </td>
                                    <td className=''>
                                        <input
                                            className='flex w-full py-2 px-4'
                                            type='number'
                                            onChange={handleQuantityChange}
                                            placeholder='Enter Product Quantity...'></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        className='text-white bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={handleAddProduct}>
                        Add Product
                    </button>
                </div>
            </Popup>
        </div>
    )
}
