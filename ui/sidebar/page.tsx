import React from 'react'
import MenuLink from '../menuLink/page'

export default function SideBar() {
    const menuItems = [
        {
            title: "Products",
            path: "/products"
        },
        {
            title: "Brands",
            path: "/brands"
        },
        {
            title: "Users",
            path: "/users"
        },
        {
            title: "Inventory",
            path: "/inventory"
        },
        {
            title: "Invoices",
            path: "/invoices"
        },
        {
            title: "Settings",
            path: "/settings"
        },
    ]

    return (
        <div className=''>
            <div className="flex items-center">
                <h1 className='font-extrabold text-white text-3xl mx-auto pt-2 mb-2 mt-2'>TechShop</h1>
            </div>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.title}>
                        <MenuLink title={item.title} path={item.path} />
                    </li>
                ))}
            </ul>
        </div>
    )
}


