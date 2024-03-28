'use client'

import EditTable from '@/ui/editTable/page'
import { product } from '@prisma/client'
import React from 'react'

export default function ProductID({ params }: { params: { productID: string } }) {

    return (
        <div>
            <EditTable productID={params.productID} />
        </div>
    )
}
