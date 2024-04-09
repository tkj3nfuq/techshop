'use client '

import Input from '@/ui/inputTable/input/page'
import { brand } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface UserEditTableProps {
    brandID: string
}

export default function BrandEditTable({ brandID }: UserEditTableProps) {
    const router = useRouter()

    const [updatedBrand, setUpdatedBrand] = React.useState<brand>({} as brand)

    React.useEffect(() => {
        fetch(`/api/brands/` + brandID)
            .then((res) => res.json())
            .then((data) => setUpdatedBrand(data))
    }, [])

    const onEditSubmit = (brandID: string, name: string, description: string) => {
        fetch(`/api/brands/${brandID}`, {
            method: "PATCH",
            body: JSON.stringify({ name, description })
        })
            .then((res) => res.json())
            .then((data) => {
                setUpdatedBrand(data)
            })
            .then(router.back)
    }

    return (
        <div className='flex flex-col mx-10 mt-2 mb-8 px-6 py-4 rounded-xl shadow-md bg-white'>
            <Input name="Name" value={updatedBrand.name || ""} onChange={(value) => setUpdatedBrand({ ...updatedBrand, name: value })} />
            <Input name="Description" value={updatedBrand.description || ""} onChange={(value) => setUpdatedBrand({ ...updatedBrand, description: value })} />
            <button
                className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 rounded-xl mb-4 transition duration-300 ease-in-out transform hover:scale-105'
                onClick={() => onEditSubmit(brandID, updatedBrand.name, updatedBrand.description)}>
                Update Brand
            </button>
        </div>
    )
}
