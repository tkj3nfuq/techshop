import VoucherDetail from '@/ui/voucher/voucherDetail/page'
import React from 'react'

export default function VoucherDetailPage({ params }: { params: { voucherID: string } }) {
    return (
        <VoucherDetail voucherID={params.voucherID} />
    )
}
