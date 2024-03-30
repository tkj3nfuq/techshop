'use client'

import EditTable from '@/ui/productEditTable/page'
import React from 'react'

export default function ProductID({ params }: { params: { productID: string } }) {

    return (
        <div>
            <EditTable productID={params.productID} />
        </div>
    )
}
