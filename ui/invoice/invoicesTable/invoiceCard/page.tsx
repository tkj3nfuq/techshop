import { order, product, user } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'

interface InvoiceCardProps {
    invoice: Order,
    index: number
}

interface Order extends Omit<order, 'user'> {
    user: user
}

export default function InvoiceCard({ invoice, index }: InvoiceCardProps) {
    const router = useRouter();

    let statusColor;
    let statusText;
    switch (invoice.status) {
        case 'Succesfully':
            statusText = 'Successfully';
            statusColor = 'text-green-600';
            break;
        case 'Pending':
            statusText = 'Pending';
            statusColor = 'text-blue-600';
            break;
        case 'Cancelled':
            statusText = 'Cancelled';
            statusColor = 'text-red-600';
            break;
        default:
            statusText = 'Unknown';
            statusColor = 'text-gray-600';
            break;
    }

    const handleInvoiceCardClick = () => {
        router.push('/invoices/' + invoice.id)
    }

    return (
        <div className='flex flex-row bg-white hover:bg-zinc-300 cursor-pointer shadow-md rounded-lg p-4 mb-4'
            onClick={handleInvoiceCardClick}
        >
            <div className='flex-1 text-gray-600 mr-4'>{index}</div>
            <div className='flex-1 text-gray-600 mr-4'>{invoice.user.fullname}</div>
            <div className='flex-1 text-gray-600 mr-4'>{invoice.paymentMethod}</div>
            <div className='flex-1 text-gray-600 mr-4'>{invoice.total}</div>
            <div className={`flex-1 ${statusColor} mr-4`}>{statusText}</div>
        </div>
    )
}
