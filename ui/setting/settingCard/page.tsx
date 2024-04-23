import React from 'react'

interface SettingCardProps {
}

export default function SettingCard() {
    return (
        <div className='flex flex-row justify-between mx-10 bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-4 transition duration-300 ease-in-out'>
            <div>
                <h2 className='text-black font-semibold ml-6'>User</h2>
            </div>
            <div>
                <h2 className='text-black font-semibold mr-6'>Icon</h2>
            </div>
        </div>
    )
}
