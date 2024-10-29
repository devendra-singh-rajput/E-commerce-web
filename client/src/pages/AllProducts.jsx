import React, { useEffect, useState } from 'react';
import UploadProducts from '../components/UploadProducts';
import summmryApi from '../common';
import adminProductCard from '../components/adminProductCard'

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
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className='font-bold text-lg'>All Products</h1>
        <button className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>
          Upload Product
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {allProducts.map((product, index) => {
          return(
            
            <adminProductCard data={product} key={index+"all products"}/>
          )
  })}
      </div> 

      {openUploadProduct && <UploadProducts onClose={() => setOpenUploadProduct(false)} />}
    </div>
  );
};

export default AllProducts;
