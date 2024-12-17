import React, { useEffect, useState } from 'react';
import UploadProducts from '../components/UploadProducts';
import summmryApi from '../common';
import AdminProductCard from '../components/adminProductCard'; // Updated import
import { FaSpinner } from 'react-icons/fa';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(summmryApi.getProducts.url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const dataResponse = await response.json();
      setAllProducts(dataResponse.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center shadow-md ">
        <h1 className='font-bold text-lg'>All Products</h1>
        <button
          className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

    
 {  (loading)&&(
    
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        <p className="ml-3 text-xl text-primary font-medium">Loading products...</p>
      </div>)
    }
      {error && <p className='text-red-500 text-center'>{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3 h-[calc(100vh-190px)] overflow-y-scroll">
      {/* //flex wrap */}
        {allProducts.map((product) => (
          <AdminProductCard data={product} key={product._id} fetchData={fetchAllProducts}/>  
        ))}
      </div>

      {openUploadProduct && <UploadProducts onClose={() => setOpenUploadProduct(false)}fetchData={fetchAllProducts} />}
    </div>
  );
};

export default AllProducts;
