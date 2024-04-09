'use client'

import ProductDetail from '@/ui/product/productDetail/page'
import React from 'react'

export default function ProductDetailPage({ params }: { params: { productID: string } }) {
    return (
        <ProductDetail productID={params.productID} />
    )
}
