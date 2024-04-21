import { user } from '@prisma/client'
import React from 'react'

interface VoucherDetaiUserCardProps {
    userID: string,
}

export default function VoucherDetaiUserCard({ userID }: VoucherDetaiUserCardProps) {
    const [user, setUser] = React.useState<user>({} as user)

    React.useEffect(() => {
        fetch(`/api/users/${userID}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])

    return (
        <div
            className='flex justify-between w-full bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-2 transition duration-300 ease-in-out'
        >
            <div className='text-nowrap truncate text-black'>{user.fullname}</div>
            <div className='text-black'>{user.email}</div>
        </div>
    )
}
