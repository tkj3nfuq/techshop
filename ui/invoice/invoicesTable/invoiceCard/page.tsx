import React from 'react'

interface Props {
    invoiceID: string,
    status: string,
    userInfo: string,
    createdAt: string
}

export default function InvoiceCard(item: Props) {
    const formateDate = (date: string) => {
        return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
    }

    return (
        <div className='flex flex-row py-2 px-2'>
            <div className='mr-2'>{item.invoiceID}</div>
            <div className='mr-2'>{item.status}</div>
            <div className='mr-2'>{item.userInfo}</div>
            <div className='mr-2'>{item.createdAt.toString()}</div>
        </div>
    )
}
