import React from 'react'
import { user } from '@prisma/client';

interface VoucherEditSelectedUserCardProps {
    userID: string,
    index: number
}

export default function VoucherEditSelectedUserCard({ userID, index }: VoucherEditSelectedUserCardProps) {
    const [user, setUser] = React.useState<user>({} as user);

    React.useEffect(() => {
        fetch(`/api/users/${userID}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])

    return (
        <div
            className='flex justify-between w-full max-w-screen-lg bg-white hover:bg-zinc-300 cursor-pointer border-b-2 p-4 mb-2 transition duration-300 ease-in-out'

        >
            <div className='text-black'>{index}</div>
            <div className='text-nowrap truncate text-black'>{user.email}</div>
        </div>
    )
}
