import React from 'react'
import { order } from '@prisma/client';

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

    return (
        <div className='text-black'>{invoice.paymentMethod}</div>
    )
}
