import React from 'react'

interface MultilineInputProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
}

export default function MultilineInput({ name, value, onChange }: MultilineInputProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };
    return (
        <div className='flex flex-row items-center w-full max-w-screen-lg justify-between bg-white p-4'>
            <h1 className='text-gray-500 font-bold'>{name}:</h1>
            <textarea
                className='ml-4 px-3 py-2 bg-white w-full max-w-screen-md border-b-2 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out hover:border-gray-300'
                placeholder='Enter your text...'
                rows={5}
                cols={50}
                maxLength={800}
                style={{ color: 'black', resize: 'none' }}
                value={value}
                onChange={handleInputChange}
            />
        </div>)
}
