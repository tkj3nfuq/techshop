"use client"

import React, { useEffect, useState } from 'react';
import UserCard from './userCard/page';

export default function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users", error));
    }, []);

    return (
        <div className='flex flex-col bg-slate-50 h-full'>
            <button
                className='bg-blue-600 self-end font-bold text-md px-4 py-2 mr-6 mt-4 mx-10 rounded-xl'
                >New User +</button>
            <ul className="mb-4 mx-10 mt-4">
                <li className="flex bg-white py-2 px-4">
                    <div className="flex-1 text-black font-semibold">Fullname</div>
                    <div className="flex-1 text-black font-semibold">Role</div>
                    <div className="flex-1 text-black font-semibold">Email</div>
                    <div className="flex-1 text-black font-semibold">Phone Number</div>
                </li>
            </ul>
            <ul>
                {users.map(user => (
                    <li className='flex flex-col mx-10'>
                        <UserCard user={user} />
                        <UserCard user={user} />
                        <UserCard user={user} />
                        <UserCard user={user} />
                        <UserCard user={user} />
                        <UserCard user={user} />
                        <UserCard user={user} />
                    </li>
                ))}
            </ul>
        </div>
    );
}