"use client"

import React from 'react'
import InvoiceCard from './invoiceCard/page'
import { order, user } from '@prisma/client'

interface Order extends Omit<order, 'user'> {
    user: user
}

export default function InvoicesTable() {
    const [invoices, setInvoices] = React.useState([] as Order[])

    React.useEffect(() => {
        fetch("/api/invoices")
            .then((data) => data.json())
            .then((data) => setInvoices(data))
    }, [])

    return (
        <div className='flex flex-col bg-slate-50 h-full'>
            <button
                className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 mr-6 mt-4 mx-10 rounded-xl'
            >New Invoices +</button>
            <ul className="mb-4 mx-10 mt-4">
                <li className="flex bg-white py-2 px-4">
                    <div className="flex-1 text-black font-semibold">Oder</div>
                    <div className="flex-1 text-black font-semibold">Full Name</div>
                    <div className="flex-1 text-black font-semibold">Payment Method</div>
                    <div className="flex-1 text-black font-semibold">Total</div>
                    <div className="flex-1 text-black font-semibold">Status</div>
                </li>
            </ul>
            <ul>
                {invoices.map((item, index) => (
                    <li className='flex flex-col mx-10'>
                        <InvoiceCard invoice={item} index={index + 1} />
                    </li>
                ))}
            </ul>
        </div>

    )
}
