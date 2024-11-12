import React, { useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/categoryWiseProduct';
import INRcurrency from '../helpers/displayCurrency';

const HorizontalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add an error state
  const  loadingList =new Array(13).fill(null)

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    if (categoryProduct?.error) {
      setError(categoryProduct.error); // Set error if present
    } else {
      setData(Array.isArray(categoryProduct.data) ? categoryProduct.data : []); // Ensure data is an array
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  if (loading==false) {
    if (data.length === 0) return<p>No products available.</p>
   if (error) return <p>Error: {error}</p>; 

  }
  return (
    <div className="container mx-auto px-3 my-2 w-full max-w-[1600px]">
      <h2 className="text-2xl font-semibold px-3 py-4 capitalize">{heading}</h2>
        
        <div className='flex items-center gap-3 md:gap-5 overflow-x-scroll scrollbar-none'>
        {loading ? (
         loadingList.map((product, index) => (
          <div
            key={index}
            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-sm shadow flex"
          >
            <div className="bg-slate-200 p-2 h-full min-w-[120px] md:min-w-[145px]">
              <h1   className="w-full h-full object-contain hover:scale-110 transition-all p-1 bg-slate-100 animate-pulse" loading="lazy" />
            </div>
            <div className="p-4 flex-1 gap-4">
              <h2 className="text-base rounded  m-1 md:text-lg text-ellipsis line-clamp-1 font-semibold p-2 bg-slate-200 animate-pulse w-full "> </h2>
              
              <div className='flex gap-4'>
              <p className=' rounded  m-1 capitalize font-semibold p-2 bg-slate-200 animate-pulse w-full'></p>
              <p className=' rounded  m-1 text-slate-900 capitalize p-2 bg-slate-200 animate-pulse w-full'></p>
              </div>
              <p className=" rounded  m-1 text-md line-through text-gray-500 p-2 bg-slate-200 animate-pulse w-full"></p>
              <p className=" rounded  m-1 text-xl font-semibold text-primary pb-2 p-2 bg-slate-200 animate-pulse w-full"></p>
            <button className='border-2  transition-colors rounded-full px-2 text-sm p-2 bg-slate-200 animate-pulse w-full'></button>
            </div>
          </div>
        ))
      ) : (
        data.map((product, index) => (
          <div
            key={index}
            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-40 bg-white rounded-sm shadow flex"
          >
            <div className="bg-slate-200 p-2 h-full min-w-[120px] md:min-w-[145px]">
              <img src={product.productImage[0]} alt={product.name} className="w-full h-full object-contain hover:scale-110 transition-all" loading="lazy" />
            </div>
            <div className="p-4 flex-1">
              <h2 className="text-base md:text-lg text-ellipsis line-clamp-1 font-semibold">{product.productName}</h2>
              
              <div className='flex gap-4'>
              <p className='capitalize font-semibold'>{product.brandName}</p>
              <p className=' text-slate-900 capitalize'>{product.category}</p>
              </div>
              <p className="text-md line-through text-gray-500">{INRcurrency(product.sellingPrice)}</p>
              <p className="text-xl font-semibold text-primary pb-2">{INRcurrency(product.price)}</p>
            <button className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full px-2 text-sm'>Add to card</button>
            </div>
          </div>
        ))
      )}
        </div>
      
    </div>
  );
};

export default HorizontalProductCard;
