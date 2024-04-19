'use client'

import { voucher } from '@prisma/client'
import React from 'react'
import VoucherCard from './voucherCard/page';
import { useRouter } from 'next/navigation';

export default function VouchersTable() {
    const router = useRouter();

    const [vouchers, setVouchers] = React.useState([] as voucher[]);

    React.useEffect(() => {
        fetch('/api/vouchers')
            .then(data => data.json())
            .then((data) => setVouchers(data))
    }, [])

    return (
        <div className='flex flex-col mx-10 mt-2 mb-8 rounded-xl shadow-md bg-white h-full'>
            <button
                className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 mr-10 mt-4 mx-10 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
                onClick={() => { router.push('/vouchers/add') }}
            >New Voucher +</button>
            <ul className="mb-4 mx-10 mt-4">
                <li className="flex bg-white py-2 px-4">
                    <div className="flex-1 text-black font-semibold">Number</div>
                    <div className="flex-1 text-black font-semibold">Voucher's Code</div>
                    <div className="flex-1 text-black font-semibold">Type</div>
                    <div className="flex-1 text-black font-semibold">Description</div>
                </li>
            </ul>
            <ul>
                {vouchers.map((voucher, index) => (
                    <li className='flex flex-col mx-10'>
                        <VoucherCard voucher={voucher} index={index + 1} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
