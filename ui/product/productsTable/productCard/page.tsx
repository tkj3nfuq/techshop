import { useRouter } from 'next/navigation';
import React from 'react'
import Popup from 'reactjs-popup'
import { brand, product } from '@prisma/client';
import InputTable from '@/ui/inputTable/page';

interface Category {
  name: string;
  description: string;
  mainProps: string[];
}

interface ProductCardProps {
  product: product,
  category: Category | null,
  onDeleteClick: (productID: string) => void,
  onEditClick: (product: product) => void,
}

export default function ProductCard({ product, onDeleteClick, onEditClick, category }: ProductCardProps) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = React.useState<brand>({} as brand);

  React.useEffect(() => {
    fetch(`/api/brands/` + product.brand)
      .then((res) => res.json())
      .then((data) => setBrand(data))
  }, [])


  const handleDeleteClick = () => {
    onDeleteClick(product.id),
      setOpen(false)
  }

  const handleEditClick = () => {
    onEditClick(product)
  }

  return (
    <div className='flex flex-col w-[190px] mt-5 shadow-md border-zinc-300 rounded-xl p-2 hover:bg-zinc-300 cursor-pointer bg-white'
      onClick={() => { setOpen(true) }
      }
    >
      <img className='mb-2 w-44 h-44 rounded-xl' src={product.image} alt={product.name}></img>
      <div className='flex flex-col'>
        <div className='font-bold text-zinc-700 max-w-44 border-t-2 border-zinc-300 pt-1.5'>{product.name}</div>
        <div className='self-end text-zinc-700'>{product.price.toLocaleString()} đ</div>
      </div>
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        modal
        closeOnDocumentClick
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className='modal flex flex-col text-black bg-white p-3 rounded-xl max-w-3xl'>
          <div className='flex flex-row justify-between mb-2 '>
            <div className='header font-bold text-xl'>{product.name}</div>
            <button className='self-end close bg-blue-600 rounded-xl h-6 w-6 text-white text-center justify-center items-center' onClick={() => setOpen(false)}>
              &times;
            </button>
          </div>
          <div className='content flex mx-1.5'>
            <table className='mb-2'>
              <tbody>
                {product.properties.map((property, index) => (
                  <tr key={index} className='border-b border-gray-300'>
                    <td className='py-2 px-4 font-bold'>{property.name}: </td>
                    <td className='py-2 px-4'>{property.value}</td>
                  </tr>
                ))}
                <tr className='border-b border-gray-300'>
                  <td className='py-2 px-4 font-bold'>Brand: </td>
                  <td className='py-2 px-4'>{brand.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex justify-between mt-4'>
            <button className='bg-green-500 text-white py-2 px-4 ml-2 rounded hover:bg-green-600' onClick={handleEditClick} >Edit</button>
            <button className='bg-red-500 text-white py-2 px-4 mr-2 rounded hover:bg-red-600' onClick={handleDeleteClick} >Delete</button>
          </div>
        </div>
      </Popup>
    </div>
  )
}