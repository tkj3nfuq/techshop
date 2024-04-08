import React from 'react'

export default function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white">
            <h1 className="text-6xl font-bold mb-6">TechShop</h1>
            <p className="text-lg text-center mb-8">
                Welcome to TechShop, your one-stop destination for all things tech!
                Explore our wide range of products and services.
            </p>
            <a href="login" className="bg-white text-blue-600 hover:bg-blue-100 py-2 px-6 rounded-full shadow-md mb-4 transition duration-300 ease-in-out transform hover:scale-105">Get Started</a>
            <a href="#about-us" className="text-blue-200 hover:text-white transition duration-300 ease-in-out">About Us</a>
        </div>
    )
}
