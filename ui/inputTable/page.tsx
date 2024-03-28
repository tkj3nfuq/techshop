import React from 'react';
import Input from './input/page';
import { product } from '@prisma/client';

interface Category {
  name: string;
  description: string;
  mainProps: string[];
}

interface InputTableProps {
  category: Category | null;
  inputValues: product;
  setInputValues: any;
}

export default function InputTable({ category, inputValues, setInputValues }: InputTableProps) {
  
  if (!category) {
    return null;
  }
  
  const handleOnChange = (attribute: string, value: string) => {
    setInputValues({...inputValues, properties: inputValues.properties?.map((prop) => prop.name === attribute ? {name: attribute, value} : prop) || [{name: attribute, value}]});
  };

  return (
    <div className='flex flex-col'>
      <Input name="Name" value={inputValues.name || ""} onChange={(value) => setInputValues({...inputValues, name: value})} />
      <Input name="Description" value={inputValues.description || ""} onChange={(value) => setInputValues({...inputValues, description: value})} />
      {category.mainProps.map((prop) => (
        <Input key={prop} name={prop} value={inputValues.properties?.find((p) => p.name === prop)?.value || ""} onChange={(value) => handleOnChange(prop, value)} />
      ))}
      <Input name="Price" value={inputValues.price?.toString() || ""} onChange={(value) => setInputValues({...inputValues, price: Number(value)})}  />
    </div>
  );
}