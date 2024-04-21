import React from 'react'
import { product } from '@prisma/client'
import Popup from 'reactjs-popup';

interface VoucherEditProductCardProps {
    product: product,
    setSelectedProducts: React.Dispatch<React.SetStateAction<product[]>>
}

export default function VoucherEditProductCard({ product, setSelectedProducts }: VoucherEditProductCardProps) {
    const [open, setOpen] = React.useState(false);

    const handleAddProduct = () => {
        setSelectedProducts((prev) => [...prev, product]);
        setOpen(false);
    }

    return (
        <div
            className='flex justify-between w-full max-w-screen-lg bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-2 transition duration-300 ease-in-out'
            onClick={() => { setOpen(true) }}
        >
            <div className='text-nowrap truncate text-black'>{product.name}</div>
            <div className='text-black'>{product.price}</div>
            <Popup
                open={open}
                onClose={() => setOpen(false)}
                closeOnDocumentClick
                modal
                overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                <div className='modal flex flex-col text-black bg-white p-3 rounded-xl max-w-3xl'>
                    <div className='flex flex-row justify-between mb-2 '>
                        <div className='header font-bold text-xl'>Select Voucher's Product</div>
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
                                    <td className='py-2 px-4 font-bold'>Price: </td>
                                    <td className='py-2 px-4'>{product.price}</td>
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
