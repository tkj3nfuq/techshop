'use client'

import { product, user, voucher } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React from 'react'
import VoucherProductCard from '../voucherInputTable/voucherProductCard/page';
import VoucherUserCard from '../voucherInputTable/voucherUserCard/page';
import VoucherDetaiProductCard from './voucherDetailProductCard/page';
import VoucherDetaiUserCard from './voucherDetailUserCard/page';

interface VoucherDetailProps {
    voucherID: string
}

export default function VoucherDetail({ voucherID }: VoucherDetailProps) {
    const router = useRouter();

    const [voucher, setVoucher] = React.useState<voucher>({} as voucher);

    const [products, setProducts] = React.useState<product[]>([]);
    const [users, setUsers] = React.useState<user[]>([]);

    const onDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete this voucher?')) {
            fetch(`/api/vouchers`, {
                method: 'DELETE',
                body: JSON.stringify({ voucherID: voucherID })
            })
                .then(() => router.push('/vouchers'))
        }
    }

    const onEditClick = () => {
        router.push(`/vouchers/${voucherID}/edit`)
    }

    React.useEffect(() => {
        fetch(`/api/vouchers/${voucherID}`)
            .then(res => res.json())
            .then(data => setVoucher(data))
    }, [])

    return (
        <div className='flex flex-col self-center mx-10 max-w-screen-sm w-full mt-2 mb-8 rounded-xl shadow-md bg-white'>
            <div className='flex flex-row mb-2 justify-between'>
                <h1 className='text-2xl text-gray-600 font-semibold ml-4 mt-4'>Voucher Detail</h1>
            </div>
            <div className='flex flex-col px-10 py-2'>
                <div className='flex mb-1 justify-between'>
                    <div className='text-gray-600 font-bold'>Voucher Code</div>
                    <div className='text-gray-600'>{voucher.code}</div>
                </div>
                <div className='flex mb-1 justify-between'>
                    <div className='text-gray-600 font-bold'>Type</div>
                    <div className='text-gray-600'>{voucher.type}</div>
                </div>
                <div className='flex mb-1 justify-between'>
                    <div className='text-gray-600 font-bold'>Value</div>
                    <div className='text-gray-600'>  {voucher.type === 'percent' ? `${voucher.value} %` : (voucher.type === 'reduce' ? `${voucher.value.toLocaleString()} đ` : voucher.value)}</div>
                </div>
                <div className='flex mb-1 justify-between'>
                    <div className='text-gray-600 font-bold'>Description</div>
                    <div className='text-gray-600'>{voucher.description}</div>
                </div>
                <div className='flex mb-1 justify-between'>
                    <div className='text-gray-600 font-bold'>Max Value in Price:</div>
                    <div className='text-gray-600'>{voucher.maxValueInFinalPrice?.toLocaleString()} đ</div>
                </div>
            </div>
            <table className='mb-4 mx-10'>
                <tbody>
                    <tr className='bg-gray-100'>
                        <th className='text-gray-600 font-bold py-2 px-4'>Products Apply</th>
                    </tr>
                    {voucher.itemsApply?.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <VoucherDetaiProductCard productID={product} index={index + 1} />
                            </td>
                        </tr>
                    ))}
                    <tr className='bg-gray-100'>
                        <th className='text-gray-600 font-bold py-2 px-4'>Users Apply</th>
                    </tr>
                    {voucher.userApply?.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <VoucherDetaiUserCard userID={user} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex flex-row justify-between'>
                <button className='bg-green-500 text-white py-2 px-4 mb-4 ml-4 rounded hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105' onClick={onEditClick}>Edit</button>
                <button className='bg-red-500 text-white py-2 px-4 mb-4 mr-4 rounded hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105' onClick={onDeleteClick}>Delete</button>
            </div>
        </div>
    )
}
