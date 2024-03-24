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
  onInputChange: (name: string, value: string) => void;
  setInputValues: any;
}

export default function InputTable({ category, inputValues, onInputChange, setInputValues }: InputTableProps) {
  
  if (!category) {
    return null;
  }

  const handleInputChange = (name: string, value: string) => {
    onInputChange(name, value);
    console.log("Updated input values:", inputValues);
  };

  return (
    <div className='flex flex-col'>
      <Input name="Name" value={inputValues.name || ""} onChange={(value) => setInputValues({...inputValues, name: value})} />
      <Input name="Description" value={inputValues.description || ""} onChange={(value) => setInputValues({...inputValues, description: value})} />
      {category.mainProps.map((attribute, index) => (
        <Input key={index} name={attribute} value={inputValues.properties.[""] || ""} onChange={(value) => setInputValues({...inputValues, attribute: value})} />
      ))}
      <Input name="Price" value={inputValues.price?.toString() || ""} onChange={(value) => setInputValues({...inputValues, price: value})}  />
    </div>
  );
}
