'use client'

import VoucherEditTable from '@/ui/voucher/voucherEditTable/page'
import React from 'react'

export default function VoucherEditPage({ params }: { params: { voucherID: string } }) {
    return (
        <VoucherEditTable voucherID={params.voucherID} />
    )
}
