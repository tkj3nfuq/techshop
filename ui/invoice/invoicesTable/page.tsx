"use client"

import React from 'react'
import InvoiceCard from './invoiceCard/page'
import { invoice } from '@prisma/client'


export default function InvoicesTable() {
    const [invoices, setInvoices] = React.useState([] as invoice[])

    React.useEffect(() => {
        fetch("/api/invoices")
        .then((data) => data.json())
        .then((data) => setInvoices(data))
    }, [])

    return (
        <div className='flex flex-col my-4'>
            {invoices.map((item) => (
                <InvoiceCard 
                invoiceID={item.id}  
                status={item.status}
                userInfo={item.userInfo}
                createdAt={item.createdAt}
                />
            ))}
        </div>
    )
}
