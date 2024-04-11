import { brand } from '@prisma/client'
import React from 'react'
import { Popup } from 'reactjs-popup';

interface BrandCardProps {
    brand: brand,
    index: number,
    onDeleteClick: (brandID: string) => void,
    onEditClick: (brandID: string) => void
}

export default function BrandCard({ brand, index, onDeleteClick, onEditClick }: BrandCardProps) {
    const [open, setOpen] = React.useState(false);

    const handleDeleteClick = () => {
        onDeleteClick(brand.id);
        setOpen(false)
    }

    const handleEditClick = () => {
        onEditClick(brand.id);
        setOpen(false)
    }

    return (
        <div
            className='flex flex-row bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-4 transition duration-300 ease-in-out'
            onClick={() => { setOpen(true) }}>
            <div className='flex-1 text-gray-600 mr-4'>{index}</div>
            <div className='flex-1 text-gray-600 mr-4'>{brand.name}</div>
            <div className='flex-1 text-gray-600 mr-4'>{brand.email}</div>
            <div className='flex-1 text-gray-600'>{brand.phoneNumber}</div>
            <Popup
                open={open}
                onClose={() => setOpen(false)}
                modal
                closeOnDocumentClick
                overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className='modal flex flex-col text-black bg-white p-3 rounded-xl max-w-3xl'>
                    <div className='flex flex-row justify-between mb-2 '>
                        <div className='header font-bold text-xl'>Brand's Information</div>
                        <button className='self-end close bg-blue-600 rounded-xl h-6 w-6 text-white text-center justify-center items-center transition duration-300 ease-in-out transform hover:scale-105' onClick={() => setOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className='content flex mx-1.5'>
                        <table className='mb-2'>
                            <tbody>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Name: </td>
                                    <td className='py-2 px-4'>{brand.name}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Description: </td>
                                    <td className='py-2 px-4'>{brand.description}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Email: </td>
                                    <td className='py-2 px-4'>{brand.email}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Phone Number: </td>
                                    <td className='py-2 px-4'>{brand.phoneNumber}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <button className='bg-green-500 text-white py-2 px-4 ml-2 rounded hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105' onClick={handleEditClick}>Edit</button>
                        <button className='bg-red-500 text-white py-2 px-4 mr-2 rounded hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105' onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}
