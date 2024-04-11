"use client"

import InputTable from '@/ui/inputTable/page'
import { category as CategoryType, ProductProperties, brand, product } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Property {
  name: string;
}

type Category = CategoryType & { mainProps: Property[] };

export default function ProductAddForm() {
  const router = useRouter();

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [inputValues, setInputValues] = React.useState<product>({ brand: "" } as product);
  const [brands, setBrands] = React.useState<brand[]>([]);
  const [selectedBrand, setSelectedBrand] = React.useState<brand | null>(null);
  const [image, setImage] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

  React.useEffect(() => {
    fetch("/api/category")
      .then((data) => data.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  React.useEffect(() => {
    fetch("/api/brands")
      .then((data) => data.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error("Error fetching brands", error));
  }, [brands])

  React.useEffect(() => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      category: selectedCategory?.id || "",
      properties: selectedCategory?.mainProps.map((attribute) => ({ name: attribute, value: "" })) || []
    }))
  }, [selectedCategory])

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    const selectedCat = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(selectedCat || null);
  };

  const handleSubmit = () => {
    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ ...inputValues, image: image } as product)
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/products")
      })
  }

  return (
    <div className='flex flex-col bg-white mx-10 mt-2 mb-8 px-6 py-4 rounded-xl shadow-md'>
      <select
        className='mt-4 mb-4 self-end cursor-pointer mr-4 hover:bg-slate-100 text-black border border-gray-300 rounded-xl px-3 py-2 focus:outline-none transition duration-300 ease-in-out'
        value={selectedCategory ? selectedCategory.id : 'all'}
        onChange={handleCategoryChange}
        required
      >
        <option value="" disabled hidden>Select your option</option>
        <option value='all' className='text-black'>All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id} className='text-black'>{category.name}</option>
        ))}
      </select>
      <CldUploadWidget
        uploadPreset='plmii4sz'
        options={{
          sources: ['local', 'url'],
          multiple: false,
          maxFiles: 1,
        }}
        onSuccess={(result) => {
          setImage((result?.info as { secure_url: string })?.secure_url || "");
        }}
      >
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
                Upload Product's Image
              </button>
            </div>
          )
        }}
      </CldUploadWidget>
      <select className='mt-4 mb-2 ml-10 w-[1025px] h-[60px] cursor-pointer hover:bg-slate-100 text-black border border-gray-300 rounded-xl px-3 py-2 focus:outline-none transition duration-300 ease-in-out'
        value={inputValues.brand} onChange={(e) => setInputValues({ ...inputValues, brand: e.target.value })}>
        <option
          value=""
          disabled hidden
        >
          Select Brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id} className='text-black'>{brand.name}</option>
        ))}
      </select>
      <div className='ml-10'>
        <InputTable category={selectedCategory} inputValues={inputValues} setInputValues={setInputValues} />
      </div>
      <button
        className='bg-blue-600 hover:bg-blue-700 mt-4 self-end font-bold text-md px-4 py-2 mr-6 rounded-xl mb-4 transition duration-300 ease-in-out transform hover:scale-105'
        onClick={handleSubmit}
      >New Product +</button>
    </div>
  );
}
