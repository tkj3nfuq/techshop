"use client"

import InvoiceDetail from '@/ui/invoice/invoiceDetail/page'
import React from 'react'

export default function InvoiceID({params}: {params: {invoiceID: string}}) {
  return (
        <InvoiceDetail invoiceID = {params.invoiceID} />
    )
}
