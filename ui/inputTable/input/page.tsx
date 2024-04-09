import React from 'react';

interface InputProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
}

export default function Input({ name, value, onChange }: InputProps) {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='flex flex-row items-center w-full max-w-screen-lg justify-between bg-white p-4 rounded-lg shadow my-2'>
      <h1 className='text-gray-500 font-bold'>{name}:</h1>
      <input
        className='ml-4 px-3 py-2 bg-white w-full max-w-screen-md border border-gray-100 rounded-md focus:outline-none focus:border-blue-600 transition duration-300 ease-in-out hover:border-gray-300'
        type='text'
        placeholder='Enter your text...'  
        value={value}
        style={{ color: 'black' }}
        onChange={handleInputChange}
      />
    </div>
  );  
}
