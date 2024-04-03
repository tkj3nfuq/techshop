import { order, user } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'
import Popup from 'reactjs-popup';

interface InvoiceCardProps {
    invoice: order,
    index: number
}

export default function InvoiceCard({ invoice, index }: InvoiceCardProps) {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<user>({} as user);

    React.useEffect(() => {
        fetch('/api/users/' + invoice.user)
            .then((data) => data.json())
            .then((data) => setSelectedUser(data))
    }, [])

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
            <div className='flex-1 text-gray-600 mr-4'>{selectedUser.fullname}</div>
            <div className='flex-1 text-gray-600 mr-4'>{invoice.paymentMethod}</div>
            <div className='flex-1 text-gray-600 mr-4'>{invoice.total}</div>
            <div className={`flex-1 ${statusColor} mr-4`}>{statusText}</div>
        </div>
    )
}
