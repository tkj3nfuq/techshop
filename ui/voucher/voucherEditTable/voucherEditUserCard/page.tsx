import { user } from '@prisma/client'
import React from 'react'
import Popup from 'reactjs-popup';

interface VoucherEditUserCardProps {
    user: user,
    setSelectedUsers: React.Dispatch<React.SetStateAction<user[]>>
}

export default function VoucherEditUserCard({ user, setSelectedUsers }: VoucherEditUserCardProps) {
    const [open, setOpen] = React.useState(false);

    const handleAddUser = () => {
        setSelectedUsers((prev) => [...prev, user]);
        setOpen(false);
    }
    return (
        <div
            className='flex justify-between w-full max-w-screen-lg bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-2 transition duration-300 ease-in-out'
            onClick={() => { setOpen(true) }}>
            <div className='text-nowrap truncate text-black'>{user.fullname}</div>
            <div className='text-nowrap truncate text-black'>{user.email}</div>
            <Popup
                open={open}
                onClose={() => setOpen(false)}
                closeOnDocumentClick
                modal
                overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                <div className='modal flex flex-col text-black bg-white p-3 rounded-xl max-w-3xl'>
                    <div className='flex flex-row justify-between mb-2 '>
                        <div className='header font-bold text-xl'>Select Voucher's User</div>
                        <button className='self-end close bg-blue-600 rounded-xl h-6 w-6 text-white text-center justify-center items-center transition duration-300 ease-in-out transform hover:scale-105' onClick={() => setOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className='content flex mx-1.5'>
                        <table className='mb-2'>
                            <tbody>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Full Name: </td>
                                    <td className='py-2 px-4'>{user.fullname}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Email: </td>
                                    <td className='py-2 px-4'>{user.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        className='text-white bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
                        onClick={handleAddUser}>
                        Add User
                    </button>
                </div>
            </Popup>
        </div>
    )
}
