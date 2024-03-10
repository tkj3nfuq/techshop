"use client"

import React from 'react'
import ProductCard from './productCard/page'
import { product } from '@prisma/client'

export default function ProductsTable() {

  const [products, setProducts] = React.useState([] as product[])

  React.useEffect(() => {
    fetch("/api/products")
      .then((data) => data.json())
      .then((data) => setProducts(data))
  }, [])

  return (
    <div className='flex flex-row ml-6'>
      {products.map((item) => (
        <li className='flex flex-row flex-wrap'>
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
          <ProductCard
            name={item.name}
            image={item.image}
            id={item.id}
            category={item.category}
            description={item.description}
            properties={item.properties}
            price={item.price}
          />
        </li>
      ))}
    </div>
  )
}
