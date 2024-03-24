"use client"

import InputTable from '@/ui/inputTable/page'
import { category as CategoryType, ProductProperties, product } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Property {
  name: string;
}

type Category = CategoryType & { mainProps: Property[] };

export default function ProductAddForm() {
  const router = useRouter();

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [inputValues, setInputValues] = React.useState({} as product); 
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

  React.useEffect(() => {
    fetch("/api/category")
      .then((data) => data.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  React.useEffect(() =>{
    setInputValues({...inputValues, properties: []})
    let result: ProductProperties[] = [];
    selectedCategory?.mainProps.map((attribute) => {
      result.push({name: attribute, value: ""})
    })
    setInputValues({...inputValues, properties: result})
    console.log("input values: ", inputValues)
  }, [selectedCategory]);


  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    const selectedCat = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(selectedCat || null);
  };

  const handleInputChange = (name: string, value: string) => {
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({...inputValues} as product)
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/products")
      })
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row justify-between'>
        <div className='mt-2 ml-4 text-black text-xl font-bold'>Adding New Product</div>
        <select
          className='mt-4 mr-4 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none'
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
      </div>
      <div className='ml-10'>
        <InputTable category={selectedCategory} inputValues={inputValues} onInputChange={handleInputChange} setInputValues={setInputValues}/>
      </div>
      <button
        className='bg-blue-600 mt-4 self-end font-bold text-md px-4 py-2 mr-6 rounded-xl mb-4'
        onClick={handleSubmit}
        >New Product +</button>
    </div>
  );
}
