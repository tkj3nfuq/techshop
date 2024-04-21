'use client'

import Input from '@/ui/inputTable/input/page';
import { product, user, voucher } from '@prisma/client';
import _, { update } from 'lodash';
import React from 'react'
import VoucherProductCard from '../voucherInputTable/voucherProductCard/page';
import VoucherUserCard from '../voucherInputTable/voucherUserCard/page';
import VoucherSelectedProductCard from '../voucherInputTable/voucherSelectedProductCard/page';
import VoucherSelectedUserCard from '../voucherInputTable/voucherSelectedUserCard/page';
import VoucherEditSelectedProductCard from './voucherEditSelectedProductCard/page';
import VoucherEditSelectedUserCard from './voucherEditSelectedUserCard/page';
import VoucherEditProductCard from './voucherEditProductCard/page';
import VoucherEditUserCard from './voucherEditUserCard/page';
import { useRouter } from 'next/navigation';

interface VoucherEditTableProps {
    voucherID: string,
}

export default function VoucherEditTable({ voucherID }: VoucherEditTableProps) {
    const router = useRouter();
    const [updatedVoucher, setUpdatedVoucher] = React.useState<voucher>({} as voucher);

    React.useEffect(() => {
        fetch("/api/vouchers/" + voucherID)
            .then(res => res.json())
            .then(data => setUpdatedVoucher(data))
    }, [])

    const [products, setProducts] = React.useState([] as product[]);
    const [selectedProducts, setSelectedProducts] = React.useState([] as product[]);

    const [users, setUsers] = React.useState([] as user[]);
    const [selectedUsers, setSelectedUsers] = React.useState([] as user[]);

    const debouncedProductSearch = _.debounce((productName: string) => {
        fetch(`/api/products/search?name=${productName}`)
            .then(response => response.json())
            .then(data => setProducts(data));
    }, 300);

    const debouncedUserSearch = _.debounce((userName: string) => {
        fetch(`/api/users/search?name=${userName}`)
            .then(response => response.json())
            .then(data => setUsers(data));
    }, 300)

    const handleProductSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const productName = event.target.value;
        debouncedProductSearch(productName);
    }

    const handleUserSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userName = event.target.value;
        debouncedUserSearch(userName);
    }

    const handleApplyAllUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedVoucher({ ...updatedVoucher, applyAllUser: event.target.checked });
    };

    const handleApplyAllItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedVoucher({ ...updatedVoucher, applyAllItem: event.target.checked });
    };

    const onSubmitClick = () => {
        if (selectedProducts.length > 0) {
            const selectedProductIDs = selectedProducts.map(product => product.id);
            updatedVoucher.itemsApply.push(...selectedProductIDs);
        }
        if (selectedUsers.length > 0) {
            const selectedUserIDs = selectedUsers.map(user => user.id);
            updatedVoucher.userApply.push(...selectedUserIDs);
        }
        fetch(`/api/vouchers/${voucherID}`, {
            method: 'PATCH',
            body: JSON.stringify({ ...updatedVoucher }),
        })
            .then(() => router.push('/vouchers'))
    }

    return (
        <div className='flex flex-col h-full bg-white mx-10 mt-2 mb-8 px-6 py-4 rounded-xl shadow-md'>
            <Input name="Voucher's Code" value={updatedVoucher.code || ""} onChange={(value) => setUpdatedVoucher({ ...updatedVoucher, code: value })} />
            <Input name="Type" value={updatedVoucher.type || ""} onChange={(value) => setUpdatedVoucher({ ...updatedVoucher, type: value })} />
            <Input name="Description" value={updatedVoucher.description || ""} onChange={(value) => setUpdatedVoucher({ ...updatedVoucher, description: value })} />
            <Input name="Value" value={updatedVoucher.value?.toString() || ""} onChange={(value) => setUpdatedVoucher({ ...updatedVoucher, value: Number(value) })} />
            <Input name="Max Value in Final Price" value={updatedVoucher.maxValueInFinalPrice?.toString() || ""} onChange={(value) => setUpdatedVoucher({ ...updatedVoucher, maxValueInFinalPrice: Number(value) })} />
            <table className='w-full'>
                <tbody>
                    <tr className='flex justify-between mt-2'>
                        <td className='flex flex-row'>
                            <td className='py-2 px-4 text-gray-500 font-bold'>Apply to all Products: </td>
                            <input className='h-6 w-6 border-gray-500 border mt-1.5 transition duration-300 ease-in-out transform hover:scale-105'
                                type="checkbox"
                                checked={updatedVoucher.applyAllItem}
                                onChange={handleApplyAllItemChange} />
                        </td>
                        <td className='flex flex-row mr-10'>
                            <td className='py-2 px-4 text-gray-500 font-bold'>Apply to all Users: </td>
                            <input className='h-6 w-6 border-gray-500 border mt-1.5 transition duration-300 ease-in-out transform hover:scale-105'
                                type="checkbox"
                                checked={updatedVoucher.applyAllUser}
                                onChange={handleApplyAllUserChange} />
                        </td>
                    </tr>
                    <tr className='flex justify-between mt-2'>
                        {!updatedVoucher.applyAllItem && (
                            <td className='flex flex-row w-full max-w-xl justify-between bg-white p-4'>
                                <h1 className='text-gray-500 font-bold'>Search Product:</h1>
                                <input
                                    className='ml-4 px-3 py-2 bg-white w-full max-w-xl border-b-2 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out hover:border-gray-300'
                                    type='text'
                                    placeholder='Enter your text...'
                                    style={{ color: 'black' }}
                                    onChange={handleProductSearch}
                                />
                            </td>

                        )}
                        {!updatedVoucher.applyAllUser && (
                            <td className='flex flex-row w-full max-w-xl justify-between bg-white p-4'>
                                <h1 className='text-gray-500 font-bold'>Search User:</h1>
                                <input
                                    className='ml-4 px-3 py-2 bg-white w-full max-w-xl border-b-2 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out hover:border-gray-300'
                                    type='text'
                                    placeholder='Enter your text...'
                                    style={{ color: 'black' }}
                                    onChange={handleUserSearch}
                                />
                            </td>
                        )}
                    </tr>
                    <tr className='flex justify-between px-3 mb-4 mt-2'>
                        <td className='flex flex-col max-w-xl w-full'>
                            <ul>
                                {products.map((product, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherEditProductCard product={product} setSelectedProducts={setSelectedProducts} />
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td className='flex flex-col max-w-xl w-full'>
                            <ul>
                                {users.map((user, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherEditUserCard user={user} setSelectedUsers={setSelectedUsers} />
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                    <tr className='flex justify-between px-3 mt-2'>
                        <td className='flex flex-col max-w-xl w-full'>
                            <h1 className='text-gray-500 font-bold'>Selected Products:</h1>
                            <ul>
                                {selectedProducts.map((product, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherEditProductCard product={product} setSelectedProducts={setSelectedProducts} />
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td className='flex flex-col max-w-xl w-full'>
                            <h1 className='text-gray-500 ml-2 font-bold'>Selected Users:</h1>
                            <ul>
                                {selectedUsers.map((user, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherEditUserCard user={user} setSelectedUsers={setSelectedUsers} />
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                    <tr className='flex justify-between px-3 mt-2'>
                        {!updatedVoucher.applyAllItem && (
                            <td className='flex flex-col max-w-xl mr-2 w-full'>
                                <h1 className='text-gray-500 font-bold'>Products Applied:</h1>
                                {updatedVoucher.itemsApply?.map((id, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherEditSelectedProductCard productID={id} index={index + 1} />
                                    </li>
                                ))}
                            </td>
                        )}
                        {!updatedVoucher.applyAllUser && (
                            <td className='flex flex-col max-w-xl ml-2 w-full'>
                                <h1 className='text-gray-500 font-bold'>Users Applied:</h1>
                                {updatedVoucher.userApply?.map((id, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherEditSelectedUserCard userID={id} index={index + 1} />
                                    </li>
                                ))}
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
            <button
                className='text-white bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
                onClick={onSubmitClick}>
                Submit Voucher
            </button>
        </div>)
}
