'use client'

import Input from '@/ui/inputTable/input/page'
import MultilineInput from '@/ui/inputTable/multilineInput/page'
import { brand } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BrandInputTable() {
  const router = useRouter();

  const [brandInputValue, setBrandInputValue] = React.useState<brand>({
    name: '',
    email: '',
    phoneNumber: '',
    description: '',
    image: ''
  } as brand)
  const [image, setImage] = React.useState('')

  const handleSubmit = () => {
    fetch('/api/brands', {
      method: 'POST',
      body: JSON.stringify({ ...brandInputValue, image: image } as brand)
    })
      .then((data) => data.json())
      .then(() => {
        router.push('/brands')
      })
  }

  return (
    <div className='flex flex-col bg-white mx-10 mt-2 mb-8 px-6 py-4 rounded-xl shadow-md'>
      <CldUploadWidget
        uploadPreset='plmii4sz'
        options={{
          sources: ['local', 'url'],
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result) => {
          setImage((result?.info as { secure_url: string })?.secure_url || "");
        }}>
        {({ open }) => {
          if (image !== "") {
            return (
              <div className="relative ml-10 mb-2 shadow-md w-[200px] h-[200px] rounded-lg overflow-hidden">
                <img src={image} className="object-cover w-full h-full rounded-lg" alt="Uploaded Image" />
                <button onClick={() => open()} className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-white text-sm font-semibold hover:bg-opacity-70 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105">
                  Change Image
                </button>
              </div>
            )
          }
          return (
            <div className="relative ml-10 mb-2 shadow-md w-[1025px] h-[60px] rounded-lg overflow-hidden">
              <button onClick={() => open()} className="absolute inset-0 w-full h-full bg-gray-200 flex justify-center items-center text-gray-700 font-semibold hover:bg-gray-300 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105">
                Upload Brand's Image
              </button>
            </div>
          )
        }}
      </CldUploadWidget>
      <Input name="Brand's Name" value={brandInputValue.name || ""} onChange={(value) => setBrandInputValue({ ...brandInputValue, name: value })} />
      <Input name="Email" value={brandInputValue.email || ""} onChange={(value) => setBrandInputValue({ ...brandInputValue, email: value })} />
      <Input name="Phone Number" value={brandInputValue.phoneNumber || ""} onChange={(value) => setBrandInputValue({ ...brandInputValue, phoneNumber: value })} />
      <MultilineInput name="Description" value={brandInputValue.description || ""} onChange={(value) => setBrandInputValue({ ...brandInputValue, description: value })} />
      <button
        className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
        onClick={handleSubmit}
      >New Brand +</button>
    </div>
  )
}
