import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productCategory'; 
import { FaCloudUploadAlt } from "react-icons/fa"; 
import uploadImage from '../helpers/uploadImage';

const UploadProducts = ({ onClose }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [], 
        description: "",
        price: "",
        sellingPrice: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = async(e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadCloudinary= await uploadImage(file)
            console.log("upload image",uploadCloudinary)
        }
    };

    return (
        <div className='fixed w-full h-full backdrop-blur-xs bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload product</h2>
                    <button className='block ml-auto hover:text-primary font-bold text-2xl' onClick={onClose}>
                        <IoClose />
                    </button>
                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-8'>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" placeholder='Enter product name' name='productName'
                        value={data.productName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' />

                    <label htmlFor="brandName" className='mt-2'>Brand Name:</label>
                    <input type="text" id="brandName" placeholder='Enter brand name' name='brandName'
                        value={data.brandName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' />

                    <label htmlFor="category" className='mt-2'>Category:</label>
                    <select name="category" value={data.category} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                        <option value="">Select a category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>

                    <label htmlFor="productImage" className='mt-2'>Product Image:</label>
                    <label htmlFor="uploadProductImage">
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col'>
                                <span className='text-3xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type="file" id="uploadProductImage" name="uploadProductImage" className='hidden' onChange={handleFileChange} />
                            </div>
                        </div>
                    </label>
                    {data.productImage && (
                        <div className='mt-2'>
                            <img src={data.productImage} width={80} height={80} className='bg-slate-100 border rounded' alt="Uploaded" />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default UploadProducts;
