"use client"

import React from 'react'
import BrandEditTable from '@/ui/brand/brandEditTable/page'

export default function BrandID({ params }: { params: { brandID: string } }) {
  return (
    <BrandEditTable brandID={params.brandID} />
  )
}
