import React, { useEffect, useState } from 'react';
import summmryApi from '../common';
import { Link } from 'react-router-dom';

const ProductCategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const categoryLoading = new Array(13).fill(null)
  // Optimization: Debounce API call (if there are user-triggered events like search/filter)
  const fetchCategoryProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(summmryApi.productCategory.url, {
        cache: 'force-cache', // Add caching to prevent repeated requests
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const responceData = await response.json();
      setProductCategory(responceData.data || []);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call fetchCategoryProducts on mount
    fetchCategoryProducts();
  }, []);

  return (
    <div className="container mx-auto p-2 my-2 cursor-pointer">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
      {loading ? (
        categoryLoading.map((el, index) => {
          return (
            <div className='w-16 h-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4
             bg-slate-200 animate-pulse' key={"categoryLOading" + index}> </div>
          )
        })
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
          productCategory.map((product, index) => (
            <Link to={"/product-category?category=" + product?.category} key={product?.id || index} className="product-item">
              <div className="w-16 h-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                <img
                  src={product?.productImage?.[0]}
                  alt={product?.category || 'Product Image'}
                  className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  loading="lazy" // Lazy load images
                />
              </div>
              <p className='text-center text-sm  md:text-base capitalize'>{product?.category}</p>
            </Link>
          ))
      )}
        </div>
    </div>
  );
};

export default ProductCategoryList;
