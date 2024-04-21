import React from 'react'
import { order, user, OrderProductList, product, voucher } from '@prisma/client';

interface InvoiceDetailProps {
    invoiceID: string
}

export default function InvoiceDetail({ invoiceID }: InvoiceDetailProps) {

    const [invoice, setInvoice] = React.useState<order>({} as order);
    const [products, setProducts] = React.useState<product[]>([]);
    const [voucher, setVoucher] = React.useState<voucher>({} as voucher);
    const [user, setUser] = React.useState<user>({} as user);

    const currentDate = new Date().toLocaleDateString();


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        date.setDate(date.getDate() - 1);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };


    React.useEffect(() => {
        fetch('/api/invoices/' + invoiceID)
            .then((data) => data.json())
            .then((data) => setInvoice(data))
    }, [invoiceID])

    React.useEffect(() => {
        if (invoice.id) {
            fetch('/api/products?id=' + invoice.productList?.map((product) => product.product).join(','), {
            })
                .then((data) => data.json())
                .then((data) => setProducts(data))
        }
    }, [invoice])

    React.useEffect(() => {
        if (invoice.voucher) {
            fetch('/api/vouchers?id=' + invoice.voucher, {
            })
                .then((data) => data.json())
                .then((data) => setVoucher(data[0]))
        }
    }, [invoice])

    React.useEffect(() => {
        if (invoice.user_id) {
            fetch('/api/users?id=' + invoice.user_id, {
            })
                .then((data) => data.json())
                .then((data) => setUser(data[0]))
        }
    }, [invoice])

    let statusColor;
    let statusText;
    switch (invoice.status) {
        case 'Succesfully':
            statusText = 'Successfully';
            statusColor = 'text-green-600';
            break;
        case 'Pending':
            statusText = 'Pending';
            statusColor = 'text-blue-600';
            break;
        case 'Cancelled':
            statusText = 'Cancelled';
            statusColor = 'text-red-600';
            break;
        default:
            statusText = 'Unknown';
            statusColor = 'text-gray-600';
            break;
    }

    return (
        <div className='flex flex-col'>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl text-gray-600 font-semibold mb-4">Invoice Detail</h1>
                <div className="bg-white w-[600px] shadow-md rounded-lg overflow-hidden">
                    <div className='px-4 py-2 flex justify-center font-extrabold text-2xl text-gray-600'>TechShop</div>
                    <div className='flex flex-row justify-between'>
                        <div className='text-gray-600 px-4'>Created At: {formatDate(currentDate)}</div>
                        <div className='text-gray-600 px-4'>Store: TechShop Phạm Văn đồng</div>
                    </div>
                    <div className="px-4 py-2">
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2 flex justify-between">Invoice ID: <span>{invoice.id}</span></p>
                            <p className="text-gray-600 mb-2 flex justify-between">Shipping Method: <span>{invoice.shippingMethod}</span></p>
                            <p className="text-gray-600 mb-2 flex justify-between">Status: <span className={statusColor}>{statusText}</span></p>
                            <p className="text-gray-600 mb-2 flex justify-between">Voucher: <span>{voucher.code}</span></p>
                            <p className="text-gray-600 flex justify-between">Customer: <span>{user.fullname}</span></p>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className='flex justify-between'>
                                    <th className="text-gray-600 py-2">Number</th>
                                    <th className="text-gray-600 py-2">Product</th>
                                    <th className="text-gray-600 py-2">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product, index) => (
                                    <tr key={index} className='flex justify-between'>
                                        <td className="text-gray-600 py-2 ml-6">{index + 1}</td>
                                        <td className="text-gray-600 py-2">{product.name}</td>
                                        <td className="text-gray-600 py-2 mr-6">{invoice.productList?.find((orderProduct) => orderProduct.product === product.id)?.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex flex-row justify-between mt-4 border-t-2 pt-2 pb-1">
                            <p className="text-gray-600 font-bold">Subtotal: {invoice.subTotal?.toLocaleString()} đ</p>
                            <p className="text-gray-600 font-bold">Total: {invoice.total?.toLocaleString()} đ</p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className='bg-blue-600 hover:bg-blue-700 self-end font-bold text-md px-4 py-2 mr-10 rounded-xl transition duration-300 ease-in-out transform hover:scale-105'
            >Print Invoice</button>
        </div>
    )
}
