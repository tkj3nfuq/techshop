import React from 'react'
import { order, user } from '@prisma/client';

interface InvoiceDetailProps {
    invoiceID: string
}

export default function InvoiceDetail({ invoiceID }: InvoiceDetailProps) {

    const [invoice, setInvoice] = React.useState<order>({} as order);

    React.useEffect(() => {
        fetch('/api/invoices/' + invoiceID)
            .then((data) => data.json())
            .then((data) => setInvoice(data))
        console.log(invoice)
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

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl text-gray-600 font-semibold mb-4">Invoice Detail</h1>
            <div className="bg-white w-[600px] shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-2">
                    <div className="mb-4">
                        <p className="text-gray-600 mb-2 flex justify-between">ID: <span>{invoice.id}</span></p>
                        <p className="text-gray-600 mb-2 flex justify-between">Payment Method: <span>{invoice.paymentMethod}</span></p>
                        <p className="text-gray-600 mb-2 flex justify-between">Status: <span className={statusColor}>{statusText}</span></p>
                        <p className="text-gray-600 mb-2 flex justify-between">Voucher: <span>{invoice.voucher}</span></p>
                        <p className="text-gray-600 flex justify-between">User: <span>{invoice.user_id}</span></p>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className='flex justify-between'>
                                <th className="text-gray-600 py-2">Product</th>
                                <th className="text-gray-600 py-2">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.productList?.map((product, index) => (
                                <tr key={index} className='flex justify-between'>
                                    <td className="text-gray-600 py-2">{product.product}</td>
                                    <td className="text-gray-600 py-2">{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-between mt-4">
                        <p className="text-gray-600 font-bold">Subtotal: {invoice.subTotal?.toLocaleString()} đ</p>
                        <p className="text-gray-600 font-bold">Total: {invoice.total?.toLocaleString()} đ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
