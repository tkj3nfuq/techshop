import { product } from '@prisma/client'
import React from 'react'

interface ProductInventoryCardProps {
    product: string,
    index: number,
    quantity: number
}

export default function ProductInventoryCard({ product, index, quantity }: ProductInventoryCardProps) {
    const [productData, setProductData] = React.useState<product>({} as product);

    React.useEffect(() => {
        fetch('/api/products/' + product)
            .then((data) => data.json())
            .then((data) => setProductData(data))
    }, [product])

    return (
        <div
            className='flex flex-row bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-4 transition duration-300 ease-in-out'>
            <div className='flex-1 text-gray-600 mr-4'>{index}</div>
            <div className='flex-1 truncate text-gray-600 mr-4'>{productData.name}</div>
            <div className='flex-1 text-gray-600 mr-4'>{productData.price?.toLocaleString()}</div>
            <div className='flex-1 text-gray-600'>{quantity}</div>
        </div>
    )
}
