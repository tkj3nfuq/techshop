import { product } from '@prisma/client';
import React from 'react'
import Input from '../inputTable/input/page';
import { useRouter } from 'next/navigation';

interface EditProductFormProps {
    productID: string;
}

export default function EditTable({ productID }: EditProductFormProps) {
    const router = useRouter();
    const [updatedProduct, setUpdatedProduct] = React.useState<product>({} as product);

    React.useEffect(() => {
        fetch("/api/products/" + productID)
            .then((data) => data.json())
            .then((data) => setUpdatedProduct(data))
    }, [])

    const handleUpdateClick = () => {
        fetch("/api/products/" + updatedProduct.id,
            {
                method: "PATCH",
                body: JSON.stringify(updatedProduct)
            }
        )
        .then(router.back)
    }

    const handleOnChange = (attribute: string, value: string) => {
        setUpdatedProduct({ ...updatedProduct, properties: updatedProduct.properties?.map((prop) => prop.name === attribute ? { name: attribute, value } : prop) || [{ name: attribute, value }] });
    };

    return (
        <div className='flex flex-col'>
            <Input name="Name" value={updatedProduct.name || ""} onChange={(value) => setUpdatedProduct({ ...updatedProduct, name: value })} />
            <Input name="Description" value={updatedProduct.description || ""} onChange={(value) => setUpdatedProduct({ ...updatedProduct, description: value })} />
            {updatedProduct.properties?.map((prop, index) => (
                <Input key={index} name={prop.name} value={updatedProduct.properties?.find((p) => p.name === prop.name)?.value || ""} onChange={(value) => handleOnChange(prop.name, value)} />
            ))}
            <Input name="Price" value={updatedProduct.price?.toString() || ""} onChange={(value) => setUpdatedProduct({ ...updatedProduct, price: Number(value) })} />
            <button
                className='bg-blue-600 mt-4 self-end font-bold text-md px-4 py-2 mr-6 rounded-xl mb-4' 
                onClick={handleUpdateClick}
                >Update Product
            </button>
        </div>
    )
}
