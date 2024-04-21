import { product } from '@prisma/client'
import React from 'react'

interface VoucherDetaiProductCardProps {
    productID: string,
    index: number,
}

export default function VoucherDetaiProductCard({ productID, index }: VoucherDetaiProductCardProps) {
    const [product, setProduct] = React.useState<product>({} as product)


    React.useEffect(() => {
        fetch(`/api/products/${productID}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])

    return (
        <div
            className='flex justify-between w-full bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-2 transition duration-300 ease-in-out'
        >
            <div className='text-black'>{index}</div>
            <div className='text-nowrap truncate text-black'>{product.name}</div>
        </div>
    )
}
