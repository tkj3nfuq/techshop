'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false
        })

        if (result?.error) {
            const error = document.getElementById("error");
            error?.classList.remove("hidden");
            error?.classList.add("block");
            setErrorMessage("Error: Invalid username or password!")
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="text-center bg-blue-600 text-white py-4">
                    <h2 className="text-3xl font-bold">Login</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-100 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm text-black transition duration-300 ease-in-out hover:border-gray-300"
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
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-100 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm text-black transition duration-300 ease-in-out hover:border-gray-300"
                        />
                    </div>
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                            {errorMessage}
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};