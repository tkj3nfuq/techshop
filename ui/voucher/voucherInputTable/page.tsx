'use client'

import Input from '@/ui/inputTable/input/page'
import { product, user, voucher } from '@prisma/client'
import _ from 'lodash'
import React from 'react'
import VoucherProductCard from './voucherProductCard/page'
import VoucherSelectedProductCard from './voucherSelectedProductCard/page'
import VoucherUserCard from './voucherUserCard/page'
import VoucherSelectedUserCard from './voucherSelectedUserCard/page'
import { useRouter } from 'next/navigation'

export default function VoucherInputTable() {
    const router = useRouter();

    const [voucherInputValue, setVoucherInputValue] = React.useState<voucher>({
        code: '',
        type: '',
        description: '',
        value: 0,
        maxValueInFinalPrice: 0,
        applyAllUser: false,
        applyAllItem: false
    } as voucher)

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
        setVoucherInputValue({ ...voucherInputValue, applyAllUser: event.target.checked });
    };

    const handleApplyAllItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherInputValue({ ...voucherInputValue, applyAllItem: event.target.checked });
    };

    const handleAddVoucher = () => {
        if (voucherInputValue.applyAllItem) {
            setSelectedProducts(products);
        }
        if (voucherInputValue.applyAllUser) {
            setSelectedUsers(users);
        }

        const productIds = selectedProducts.map(product => product.id);
        const userIds = selectedUsers.map(user => user.id);

        fetch('/api/vouchers', {
            method: 'POST',
            body: JSON.stringify({
                code: voucherInputValue.code,
                type: voucherInputValue.type,
                description: voucherInputValue.description,
                value: voucherInputValue.value,
                maxValueInFinalPrice: voucherInputValue.maxValueInFinalPrice,
                applyAllUser: voucherInputValue.applyAllUser,
                applyAllItem: voucherInputValue.applyAllItem,
                products: productIds,
                users: userIds
            })
        })
            .then((res) => res.json())
            .then((data) => {
                router.push('/vouchers')
            })
    }

    return (
        <div className='flex flex-col h-full bg-white mx-10 mt-2 mb-8 px-6 py-4 rounded-xl shadow-md'>
            <Input name="Voucher's Code" value={voucherInputValue.code || ""} onChange={(value) => setVoucherInputValue({ ...voucherInputValue, code: value })} />
            <Input name="Type" value={voucherInputValue.type || ""} onChange={(value) => setVoucherInputValue({ ...voucherInputValue, type: value })} />
            <Input name="Description" value={voucherInputValue.description || ""} onChange={(value) => setVoucherInputValue({ ...voucherInputValue, description: value })} />
            <Input name="Value" value={voucherInputValue.value?.toString() || ""} onChange={(value) => setVoucherInputValue({ ...voucherInputValue, value: Number(value) })} />
            <Input name="Max Value in Final Price" value={voucherInputValue.maxValueInFinalPrice?.toString() || ""} onChange={(value) => setVoucherInputValue({ ...voucherInputValue, maxValueInFinalPrice: Number(value) })} />
            <table className='w-full'>
                <tbody>
                    <tr className='flex justify-between mt-2'>
                        <td className='flex flex-row'>
                            <td className='py-2 px-4 text-gray-500 font-bold'>Apply to all Products: </td>
                            <input className='h-6 w-6 border-gray-500 border mt-1.5 transition duration-300 ease-in-out transform hover:scale-105'
                                type="checkbox"
                                checked={voucherInputValue.applyAllItem}
                                onChange={handleApplyAllItemChange} />
                        </td>
                        <td className='flex flex-row mr-10'>
                            <td className='py-2 px-4 text-gray-500 font-bold'>Apply to all Users: </td>
                            <input className='h-6 w-6 border-gray-500 border mt-1.5 transition duration-300 ease-in-out transform hover:scale-105'
                                type="checkbox"
                                checked={voucherInputValue.applyAllUser}
                                onChange={handleApplyAllUserChange} />
                        </td>
                    </tr>
                    <tr className='flex justify-between mt-2'>
                        {!voucherInputValue.applyAllItem && (
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
                        {!voucherInputValue.applyAllUser && (
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
                    <tr className='flex justify-between mt-2'>
                        <td className='flex flex-col max-w-xl w-full'>
                            <ul>
                                {products.map((product, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherProductCard product={product} setSelectedProducts={setSelectedProducts} />
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td className='flex flex-col max-w-xl w-full'>
                            <ul>
                                {users.map((user, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherUserCard user={user} index={index + 1} setSelectedUsers={setSelectedUsers} />
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                    <tr className='flex justify-between px-3 mt-2'>
                        {!voucherInputValue.applyAllItem && (
                            <td className='flex flex-col max-w-xl mr-2 w-full'>
                                <h1 className='text-gray-500 font-bold'>Selected Products:</h1>
                                {selectedProducts.map((product, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherSelectedProductCard product={product} index={index + 1} setSelectedProducts={setSelectedProducts} />
                                    </li>
                                ))}
                            </td>
                        )}
                        {!voucherInputValue.applyAllUser && (
                            <td className='flex flex-col max-w-xl ml-2 w-full'>
                                <h1 className='text-gray-500 font-bold'>Selected Users:</h1>
                                {selectedUsers.map((user, index) => (
                                    <li className='flex flex-col' key={index}>
                                        <VoucherSelectedUserCard user={user} index={index + 1} setSelectedUsers={setSelectedUsers} />
                                    </li>
                                ))}
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
            <button
                className='text-white bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
                onClick={handleAddVoucher}>
                Add Voucher
            </button>
        </div>
    )
}
