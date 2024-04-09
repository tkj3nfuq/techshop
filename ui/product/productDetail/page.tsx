import React from 'react'
import { brand, category, product } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface ProductDetailProps {
  productID: string
}

export default function ProductDetail({ productID }: ProductDetailProps) {
  const router = useRouter();

  const [product, setProduct] = React.useState<product>({} as product)
  const [brand, setBrand] = React.useState<brand>({} as brand)
  const [category, setCategory] = React.useState<category>({} as category)

  React.useEffect(() => {
    fetch(`/api/products/` + productID)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [productID])

  React.useEffect(() => {
    if (product.brand) {
      fetch(`/api/brands/` + product.brand)
        .then((res) => res.json())
        .then((data) => setBrand(data))
    }
  }, [product])

  React.useEffect(() => {
    if (product.category) {
      fetch(`/api/category/` + product.category)
        .then((res) => res.json())
        .then((data) => setCategory(data))
    }
  }, [product])

  const handleEditClick = () => {
    router.push(`/products/${productID}`)
  }

  const handleDeleteCLick = (productID: string) => {
    fetch(`/api/products`, {
      method: 'DELETE',
      body: JSON.stringify({ productID: productID })
    })
      .then((res) => res.json())
      .then((data) => {
        router.push('/products')
      })
  }


  return (
    <div className='flex flex-col px-6 py-6 bg-white rounded-xl mx-10 mt-2 mb-8 shadow-md'>
      <div className='flex flex-row justify-between'>
        <div>
          <img className='w-[480px] h-[480px] rounded-xl ml-4' src={product.image} alt={product.name}></img>
        </div>
        <div className='text-black w-[600px] h-[520px] mr-4 flex justify-between flex-col'>
          <div>
            <div className='font-bold text-3xl pb-3'>{product.name}</div>
            <div className='text font-bold'>Description:</div>
            <div className='text-left'>{product.description}</div>
            <div className='text font-bold'>Brand:</div>
            <div className='text'>{brand.name}</div>
            <div className='text font-bold'>Category:</div>
            <div className='text'>{category.name}</div>
          </div>
          <div className='flex flex-row justify-between mb-10'>
            <div className='text-2xl font-bold'>Price:</div>
            <div className='text-2xl'>{product.price?.toLocaleString()} đ</div>
          </div>
        </div>
      </div>
      <div className='content flex flex-col mx-4 text-black mb-6'>
        <div className='text font-bold mb-2'>Specification:</div>
        <table className='mb-2'>
          <tbody>
            {product.properties?.map((property, index) => (
              <tr key={index} className='flex justify-between'>
                <td className='text px-4 text-gray-500 ml-4'>{property.name}: </td>
                <td className='text px-4 mr-4'>{property.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row justify-between'>
        <button className='bg-green-500 text-white py-2 px-4 ml-4 rounded hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105' onClick={handleEditClick}>Edit</button>
        <button className='bg-red-500 text-white py-2 px-4 mr-4 rounded hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105' onClick={() => handleDeleteCLick(product.id)}>Delete</button>
      </div>
    </div>
  )
}
