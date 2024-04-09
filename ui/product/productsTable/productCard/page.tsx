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
}

export default function ProductCard({ product, category }: ProductCardProps) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = React.useState<brand>({} as brand);

  React.useEffect(() => {
    fetch(`/api/brands/` + product.brand)
      .then((res) => res.json())
      .then((data) => setBrand(data))
  }, [product])

  return (
    <div className='flex flex-col w-[218px] mt-5 shadow-md border-zinc-300 rounded-xl p-4 hover:bg-zinc-300 cursor-pointer bg-white transition duration-300 ease-in-out transform hover:scale-105'
      onClick={() => { 
        router.push(`/products/detail/${product.id}`)
       }
      }
    >
      <img className='mb-2 w-46 h-46 rounded-xl' src={product.image} alt={product.name}></img>
      <div className='flex flex-col'>
        <div className='font-bold text-zinc-700 max-w-44 w-full border-zinc-300 pt-1.5'>{product.name}</div>
        <div className='self-end text-zinc-700'>{product.price.toLocaleString()} đ</div>
      </div>
    </div>
  )
}