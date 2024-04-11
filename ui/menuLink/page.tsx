"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props {
    title: string;
    path: string;
}

export default function MenuLink(item: Props) {
    const pathname = usePathname()
    return (
        <Link
            href={item.path}
            className={`text-white flex flex-row items-center transition duration-300 ease-in-out transform hover:scale-105 justify-start px-4 h-12 mx-4 my-2 rounded-md hover:bg-zinc-500 ${pathname.startsWith(item.path) ? "bg-blue-600" : ""
                }`}>
            <h1>{item.title}</h1>
        </Link>
    )
}
