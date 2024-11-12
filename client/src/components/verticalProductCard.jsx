import React, { useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/categoryWiseProduct';
import INRcurrency from '../helpers/displayCurrency';

const verticalProductCard = ({ category, heading }) => {
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

  if (data.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; // Display error message if there is one

  return (
    <div className="container mx-auto px-3 my-4 w-full max-w-[1600px] bg-white">
      <h2 className="text-2xl font-semibold px-3 py-4 capitalize">{heading}</h2>
        
        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none'>
        {loading ? (
        loadingList.map((product, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]   rounded-sm shadow  bg-white  p-2 m-2  animate-pulse"
            >
              <div className="bg-slate-200  p-4 h-48 min-w-[280px] md:min-w-[145px]">
              </div> 
              <div className="p-4 flex gap-2 justify-between">
                <div className='gap-3'>
                <h2 className="text-base md:text-lg text-ellipsis line-clamp-1 font-semibold w-32 bg-slate-200 rounded p-2 m-1  animate-pulse"></h2>
                
                <div className=' gap-4'>
                <p className='capitalize font-semibold w-32 bg-slate-200 rounded p-2 m-1  animate-pulse'> </p>
                <p className=' text-slate-900 capitalize w-32 bg-slate-200 rounded p-2 m-1  animate-pulse'> </p>
                </div>
                <p className="text-md line-through text-gray-500 w-32 bg-slate-200 rounded p-2 m-1  animate-pulse"> </p>
                <p className="text-xl font-semibold  pb-2 w-32 bg-slate-200 rounded p-2 m-1  animate-pulse"> </p>
              <button className='border-2  transition-colors rounded-full px-2 text-sm w-32 bg-slate-200  p-2 m-1  animate-pulse'></button>
             
                </div>
                <div class="border-l border-gray-300 h-36 hidden md:block"></div>
                <div>
  
                  <p className='text-ellipsis line-clamp-6 h-36 hidden md:block w-32 bg-slate-200 rounded p-2 m-1  animate-pulse '> </p>
                </div>
                 </div>
            </div>
          ))
      ) : (
        data.map((product, index) => (
          <div
            key={index}
            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow     "
          >
            <div className="bg-slate-200  p-4 h-48 min-w-[280px] md:min-w-[145px]">
              <img src={product.productImage[0]} alt={product.name} className="w-full h-full mix-blend-multiply object-contain hover:scale-110 transition-all" loading="lazy" />
            </div> 
            <div className="p-4 flex gap-2">
              <div className='gap-3'>
              <h2 className="text-base md:text-lg text-ellipsis line-clamp-1 font-semibold">{product.productName}</h2>
              
              <div className='flex gap-4'>
              <p className='capitalize font-semibold'>{product.brandName}</p>
              <p className=' text-slate-900 capitalize'>{product.category}</p>
              </div>
              <p className="text-md line-through text-gray-500">{INRcurrency(product.sellingPrice)}</p>
              <p className="text-xl font-semibold text-primary pb-2">{INRcurrency(product.price)}</p>
            <button className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full px-2 text-sm'>Add to card</button>
           
              </div>
              <div class="border-l border-gray-300 h-36 hidden md:block"></div>
              <div>

                <p className='text-ellipsis line-clamp-6 h-36 hidden md:block '>{ product.description}</p>
              </div>
               </div>
          </div>
        ))
      )}
        </div>
      
    </div>
  );
};

export default verticalProductCard;
