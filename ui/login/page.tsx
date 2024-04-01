'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface LoginState {
    username: string;
    password: string;
}

export default function LoginPage() {
    const route = useRouter();
    const [loginState, setLoginState] = useState<LoginState>({
        username: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = () => {
        console.log('Logging in with:', loginState);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="text-center bg-white-900 text-black py-4">
                    <h2 className="text-3xl font-bold">Login</h2>
                </div>
                <form className="p-6 space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={loginState.username}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={loginState.password}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => {route.push("/dashboard")}}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};