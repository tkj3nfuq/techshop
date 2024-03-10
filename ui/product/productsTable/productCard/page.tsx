import React from 'react'
import Popup from 'reactjs-popup'

interface Property {
  name: string,
  value: string
}

interface ProductCardProps {
  name: string,
  image: string,
  id: string,
  category: string,
  description: string,
  price: number,
  properties: Property[]
}

export default function ProductCard(product: ProductCardProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='flex flex-col mx-2 mt-8 border-2 border-zinc-300 rounded-xl items-center p-2 hover:bg-zinc-300 cursor-pointer'
      onClick={() => { setOpen(true) }
      }
    >
      <img className='mb-2 w-44 h-44 rounded-xl' src={product.image} alt={product.name}></img>
      <div className='flex flex-col'>
        <div className='font-bold text-zinc-700 max-w-44'>{product.name}</div>
        {/* <ul>
        {product.properties.map((property) => (
          <li key={property.name}>
              {property.name}: {property.value}
          </li>
        ))}
      </ul> */}
        <div className='self-end text-zinc-700'>{product.price.toLocaleString()}</div>
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
              </tbody>
            </table>
          </div>
        </div>
      </Popup>
    </div>
  )
}

{/* <ul>
              {product.properties.map(property => (
                <li key={property.name} className='flex flex-row'>
                  <div className='font-bold'>
                    {property.name}:
                  </div>
                  <div className='ml-1'>{property.value}</div>
                </li>
              ))}
            </ul> */}