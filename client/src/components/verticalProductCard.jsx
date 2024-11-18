import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/categoryWiseProduct';
import INRcurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const verticalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add an error state
  const loadingList = new Array(13).fill(null)
  const { userAddToCart } = useContext(Context);

  const handleAddToCart = (e, _id) => {
    e.stopPropagation();
    addToCart(e, _id);
    userAddToCart();
  };


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

  setTimeout(() => {
    if (loading === false) {
      if (data.length === 0) return <p>No Internet Connection available...</p>;
      if (error) return <p>Error: {error}</p>;
    }
  }, 20000); // 20000 ms = 20 seconds

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
                <div className="border-l border-gray-300 h-36 hidden md:block"></div>
                <div>

                  <p className='text-ellipsis line-clamp-6 h-36 hidden md:block w-32 bg-slate-200 rounded p-2 m-1  animate-pulse '> </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          data.map((product, index) => (
            <Link to={"productDetail/"+product?._id}
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow"
            >

             {/* scroll images to card */}
              <div className="bg-slate-200  h-48 min-w-[280px] md:min-w-[145px] w-full overflow-x-auto  space-x-4  snap-both snap-mandatory scrollbar-none flex  scroll-behavior:smooth">
                {product.productImage.map((src, index) => (
                  <div
                    key={index}
                    className="w-full p-4 mix-blend-multiply h-48 snap-center flex items-center flex-shrink-0   justify-center transition-transform duration-300 ease-in-out transform hover:scale-110 "
                  >
                    <img
                      src={src}
                      alt={product.name}
                      className="w-full h-full object-contain "
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <div className="p-4 flex gap-2">
                <div className='gap-3'>
                  <h2 className="text-base md:text-lg text-ellipsis line-clamp-1 font-semibold">{product.productName}</h2>

                  <div className='flex gap-4 '>
                    <p className='capitalize font-semibold'>{product.brandName}</p>
                    <p className=' text-slate-900 capitalize'>{product.category}</p>
                  </div>
                  <p className="text-md line-through text-gray-500">{INRcurrency(product.sellingPrice)}</p>
                  <p className="text-xl font-semibold  pb-2">{INRcurrency(product.price)}</p>
                  <button className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full px-2 text-sm'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to cart</button>

                </div>
                <div className="border-l  border-gray-300 h-36 hidden md:block"></div>
                <div >

                  <p className='text-ellipsis line-clamp-6 h-36 hidden md:block overflow-y-scroll scrollbar-none '>{product.description}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
};

export default verticalProductCard;
