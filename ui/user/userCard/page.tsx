import React from 'react';
import Popup from 'reactjs-popup';

interface Address {
    name: string,
    value: string
}

interface UserCardProps {
    user: {
        id: string;
        dateOfBirth: Date,
        fullname: string;
        role: string;
        email: string;
        phoneNumber: string;
        username: string,
        password: string,
        address: Address[],
    };
}

export default function UserCard({ user }: UserCardProps) {
    const [open, setOpen] = React.useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        
        date.setDate(date.getDate() - 1);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    };
    

    return (
        <div
            className='flex flex-row bg-white hover:bg-zinc-300 cursor-pointer shadow-md rounded-lg p-4 mb-4'
            onClick={() => { setOpen(true) }}>
            <div className='flex-1 text-gray-600 mr-4'>{user.fullname}</div>
            <div className='flex-1 text-gray-600 mr-4'>{user.role}</div>
            <div className='flex-1 text-gray-600 mr-4'>{user.email}</div>
            <div className='flex-1 text-gray-600'>{user.phoneNumber}</div>
            <Popup
                open={open}
                onClose={() => setOpen(false)}
                modal
                closeOnDocumentClick
                overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className='modal flex flex-col text-black bg-white p-3 rounded-xl max-w-3xl'>
                    <div className='flex flex-row justify-between mb-2 '>
                        <div className='header font-bold text-xl'>User's Information</div>
                        <button className='self-end close bg-blue-600 rounded-xl h-6 w-6 text-white text-center justify-center items-center' onClick={() => setOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <div className='content flex mx-1.5'>
                        <table className='mb-2'>
                            <tbody>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>UserID: </td>
                                    <td className='py-2 px-4'>{user.id}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Full Name: </td>
                                    <td className='py-2 px-4'>{user.fullname}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Role: </td>
                                    <td className='py-2 px-4'>{user.role}</td>
                                </tr>
                                {user.dateOfBirth && (
                                    <tr className='border-b border-gray-300'>
                                        <td className='py-2 px-4 font-bold'>Date of Birth: </td>
                                        <td className='py-2 px-4'>{formatDate(user.dateOfBirth.toString())}</td>
                                    </tr>
                                )}
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Phone Number: </td>
                                    <td className='py-2 px-4'>{user.phoneNumber}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Email: </td>
                                    <td className='py-2 px-4'>{user.email}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>UserName: </td>
                                    <td className='py-2 px-4'>{user.username}</td>
                                </tr>
                                <tr className='border-b border-gray-300'>
                                    <td className='py-2 px-4 font-bold'>Password: </td>
                                    <td className='py-2 px-4'>{user.password}</td>
                                </tr>
                                {user.address.map((address, index) => (
                                    <tr key={index} className='border-b border-gray-300'>
                                        <td className='py-2 px-4 font-bold'>Address {index + 1}: </td>
                                        <td className='py-2 px-4'>{address.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Popup>
        </div>
    );
}
