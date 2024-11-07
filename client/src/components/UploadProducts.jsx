import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from '../components/displayImage';
import { MdDeleteForever } from "react-icons/md";
import summmryApi from '../common';
import { toast } from 'react-toastify';
import uploadImages from '../helpers/uploadImage';

const UploadProducts = ({ onClose, fetchData }) => {
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    //upload image to cloudinary
    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array of files
        if (files.length > 0) {
            setLoading(true);
            setError("");
            try {
                // Upload multiple images using uploadImages function
                const uploadResponses = await uploadImages(files);
                // Extract URLs from each successful upload response
                const imageUrls = uploadResponses.map(response => response.url);
        
                // Update state with new image URLs
                setData((prevData) => ({
                    ...prevData,
                    productImage: [...prevData.productImage, ...imageUrls]
                }));
        
                toast.success("Images uploaded successfully!");
            } catch (err) {
                setError("Image upload failed.");
                toast.error("Image upload failed.");
            } finally {
                setLoading(false);
            }
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Custom validation for image upload and other fields
        if (!data.productName || !data.brandName || !data.category || !data.price || !data.sellingPrice || !data.description || data.productImage.length === 0) {
            toast.error("Please fill in all required fields, including at least one image.");
            return;
        }
        if (parseFloat(data.sellingPrice) >= parseFloat(data.price)) {
            toast.error("Selling price must be less than the regular price.");
            return;
        }

        // Proceed with uploading the product
        setLoading(true);
        try {
            const response = await fetch(summmryApi.uploadProduct.url, {
                method: summmryApi.uploadProduct.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const dataResponse = await response.json();
            if (response.ok) {
                toast.success(dataResponse.message);
                onClose();
                fetchData();
            } else {
                toast.error(dataResponse.message || "Failed to upload product.");
            }
        } catch (error) {
            console.error("Error during product upload:", error);
            toast.error("An error occurred while uploading the product.");
        } finally {
            setLoading(false);
        }
    };



    const deleteProductImage = (index) => {
        setData((prevData) => {
            const newImages = prevData.productImage.filter((_, i) => i !== index);
            return {
                ...prevData,
                productImage: newImages,
            };
        });
    };

    return (
        <div className='fixed w-full h-full backdrop-blur-xs bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <button className='block ml-auto hover:text-primary font-bold text-2xl' onClick={onClose}>
                        <IoClose />
                    </button>
                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-8' onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name:</label>
                    <input type="text" id="productName" placeholder='Enter product name' name='productName'
                        value={data.productName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required />

                    <label htmlFor="brandName" className='mt-2'>Brand Name:</label>
                    <input type="text" id="brandName" placeholder='Enter brand name' name='brandName'
                        value={data.brandName} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required />

                    <label htmlFor="category" className='mt-2'>Category:</label>
                    <select name="category" value={data.category} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required>
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
                                <input type="file" id="uploadProductImage" name="uploadProductImage" multiple accept="image/*" className='hidden' onChange={handleFileChange}/>
                            </div>
                        </div>
                    </label>
                    {error && <p className='text-red-500 text-xs'>{error}</p>}
                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex justify-center gap-3'>
                                {data.productImage.map((el, index) => (
                                    <div className='relative group' key={index}>
                                        <img src={el}  className='bg-slate-100 border rounded cursor-pointer w-24 h-24 object-contain' alt={el}
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(el);
                                            }} />
                                        <div className='absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer' onClick={() => deleteProductImage(index)}>
                                            <MdDeleteForever />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-primary text-xs'>*Please upload a product image</p>
                        )}
                    </div>

                    <label htmlFor="price" className='mt-2'>Price:</label>
                    <input type="number" id="price" placeholder='Enter price' name='price'
                        value={data.price} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'
                         required 
                         />

                    <label htmlFor="sellingPrice" className='mt-2'>Selling Price:</label>
                    <input type="number" id="sellingPrice" placeholder='Enter selling price' name='sellingPrice'
                        value={data.sellingPrice} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required />

                    <label htmlFor="description" className='mt-2'>Description:</label>
                    <textarea id="description" placeholder='Enter product description' name='description'
                        value={data.description} onChange={handleOnChange} className='p-2 bg-slate-100 border rounded h-28' rows="4" required />

                    <button
                        type='submit'
                        className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-1 px-3 rounded-full'
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Product"}
                    </button>

                </form>
            </div>
            {/* Display image in full screen */}
            {openFullScreenImage && <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />}
        </div>
    );
}

export default UploadProducts;
