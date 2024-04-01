"use client"

import React from 'react'
import ProductCard from './productCard/page'
import { product, category as CategoryType } from '@prisma/client'
import { error } from 'console'
import { useRouter } from 'next/navigation'
import EditTable from '@/ui/productEditTable/page'

interface Property {
  name: string;
}

type Category = CategoryType & { mainProps: Property[] };

export default function ProductsTable() {

  const router = useRouter()

  const [products, setProducts] = React.useState([] as product[])
  const [selectedProduct, setSelectedProduct] = React.useState<product | null>(null);
  const [categories, setCategories] = React.useState([] as Category[])
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [placeolderText, setPlaceholderText] = React.useState<string>('All Categories')

  React.useEffect(() => {
    fetch("/api/products")
      .then((data) => data.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products", error))
  }, [])

  React.useEffect(() => {
    fetch("api/category")
      .then((data) => data.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories", error))
  }, [])

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryValue = event.target.value;

    setSelectedCategory(selectedCategoryValue !== 'all' ? categories.find(category => category.id === selectedCategoryValue) || null : null);

    if (selectedCategoryValue !== 'all') {
      const selectedCategoryName = categories.find(category => category.id === selectedCategoryValue)?.name;
      setPlaceholderText(selectedCategoryName || 'All Categories');
    } else {
      setPlaceholderText('All Categories');
    }
  }

  const handleDeleteClick = (productID: string) => {
    fetch("api/products", {
      method: "DELETE",
      body: JSON.stringify({ productID: productID })
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(products.filter(product => product.id !== productID));
      })
  }

  const handleEditClick = (selectedProduct: product) => {
    router.push("/products/" + selectedProduct.id)
  };

  const filteredProducts = selectedCategory
    ? products.filter((item) => item.category === selectedCategory.id)
    : products;

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-between'>
        <select
          className='mt-4 ml-6 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none'
          value={selectedCategory?.name || 'all'}
          onChange={handleCategoryChange}
          required
        >
          <option value="" disabled selected hidden>Select your option</option>
          <option value='all' className='text-black'>All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id} className='text-black'>{category.name}</option>
          ))}
        </select>
        <button
          className='bg-blue-600 hover:bg-blue-700 mt-4 self-end font-bold text-md px-4 py-2 mr-6 rounded-xl'
          onClick={() => router.push('/products/add')}>New Product +</button>
      </div>
      {filteredProducts.map((item) => (
        <li className='flex flex-row flex-wrap ml-6'>
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
          <ProductCard product={item} category={selectedCategory} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick} />
        </li>
      ))}
    </div>
  )
}
