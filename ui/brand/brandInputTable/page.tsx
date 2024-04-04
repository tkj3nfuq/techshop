'use client'

import Input from '@/ui/inputTable/input/page'
import { brand } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BrandInputTable() {
  const router = useRouter();

  const [brandInputValue, setBrandInputValue] = React.useState<brand>({} as brand)

  const handleSubmit = () => {
    fetch('/api/brands', {
      method: 'POST',
      body: JSON.stringify({ ...brandInputValue } as brand)
    })
      .then((data) => data.json())
      .then(() => {
        router.push('/brands')
      })
  }

  return (
    <div className='flex flex-col mx-10 mt-4'>
      <Input name="Brand's Name" value={brandInputValue.name || ""} onChange={(value) => setBrandInputValue({ ...brandInputValue, name: value })} />
      <Input name="Description" value={brandInputValue.description || ""} onChange={(value) => setBrandInputValue({ ...brandInputValue, description: value })} />
      <button
        className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 rounded-xl mb-4'
        onClick={handleSubmit}
      >New Brand +</button>
    </div>
  )
}
