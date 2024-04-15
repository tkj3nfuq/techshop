'use client'

import { product } from '@prisma/client'
import React from 'react'
import _ from 'lodash';
import InventoryAddNewProductCard from './inventoryAddNewProductCard/page';

interface InventoryAddNewProductProps {
}

export default function InventoryAddNewProduct({ }: InventoryAddNewProductProps) {
    const [products, setProducts] = React.useState([] as product[]);

    const debouncedSearch = _.debounce((productName: string) => {
        fetch(`/api/products/search?name=${productName}`)
            .then(response => response.json())
            .then(data => setProducts(data));
    }, 300);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const productName = event.target.value;
        debouncedSearch(productName);
    }

    return (
        <div className='flex flex-col mx-10 mt-2 mb-4 pb-8 rounded-xl shadow-md bg-white'>
            <div className='flex flex-row items-center w-full max-w-screen-lg justify-between bg-white p-4'>
                <h1 className='text-gray-500 font-bold'>Search Product:</h1>
                <input
                    className='ml-4 px-3 py-2 bg-white w-full max-w-screen-md border-b-2 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out hover:border-gray-300'
                    type='text'
                    placeholder='Enter your text...'
                    style={{ color: 'black' }}
                    onChange={handleSearch}
                />
            </div>
            <ul>
                <li className="flex bg-white mx-10 py-2">
                    <div className="flex-1 text-black font-semibold">Number</div>
                    <div className="flex-1 text-black font-semibold">Product's Name</div>
                </li>
            </ul>
            <ul>
                {products.map((product, index) => (
                    <li className='flex flex-col mx-10' key={index}>
                        <InventoryAddNewProductCard product={product} index={index + 1} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
