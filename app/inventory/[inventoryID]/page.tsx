'use client'

import InventoryDetail from '@/ui/inventory/inventoryDetail/page'
import React from 'react'

export default function InventoryDetailPage({ params }: { params: { inventoryID: string } }) {
  return (
    <InventoryDetail inventoryID={params.inventoryID} />
  )
}
