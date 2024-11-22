import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import INRcurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { Link } from 'react-router-dom';

const SearchVerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null);
    const { userAddToCart } = useContext(Context); // Move useContext inside the component

  const handleAddToCart = (e, _id) => {
    e.stopPropagation();
    addToCart(e, _id);
    userAddToCart();
  };

  return (
    <div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none'>
        {loading ? (
          loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow bg-white p-2 m-2 animate-pulse"
            >
              <div className="bg-slate-200 p-4 h-48 min-w-[280px] md:min-w-[145px]" />
              <div className="p-4 flex gap-2 justify-between">
                <div className="gap-3">
                  <h2 className="text-base md:text-lg text-ellipsis line-clamp-1 font-semibold w-32 bg-slate-200 rounded p-2 m-1 animate-pulse" />
                  <div className="gap-4">
                    <p className="capitalize font-semibold w-32 bg-slate-200 rounded p-2 m-1 animate-pulse" />
                    <p className="text-slate-900 capitalize w-32 bg-slate-200 rounded p-2 m-1 animate-pulse" />
                  </div>
                  <p className="text-md line-through text-gray-500 w-32 bg-slate-200 rounded p-2 m-1 animate-pulse" />
                  <p className="text-xl font-semibold pb-2 w-32 bg-slate-200 rounded p-2 m-1 animate-pulse" />
                  <button className="border-2 transition-colors rounded-full px-2 text-sm w-32 bg-slate-200 p-2 m-1 animate-pulse" />
                </div>
                <div className="border-l border-gray-300 h-36 hidden md:block" />
                <div>
                  <p className="text-ellipsis line-clamp-6 h-36 hidden md:block w-32 bg-slate-200 rounded p-2 m-1 animate-pulse" />
                </div>
              </div>
            </div>
          ))
        ) : (
          data.map((product, index) => (
            <Link
              to={`/productDetail/${product?._id}`}
              key={index}
              className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow"
              onClick={scrollTop}
            >
              <div className="bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] w-full overflow-x-auto space-x-4 snap-both snap-mandatory scrollbar-none flex scroll-behavior:smooth">
                {product.productImage.map((src, idx) => (
                  <div
                    key={idx}
                    className="w-full p-4 mix-blend-multiply h-48 snap-center flex items-center flex-shrink-0 justify-center transition-transform duration-300 ease-in-out transform hover:scale-110"
                  >
                    <img src={src} alt={product.name} className="w-full  h-full object-contain" loading="lazy" />
                  </div>
                ))}
              </div>

              <div className="p-4 flex gap-2">
                <div className="gap-3">
                  <h2 className="text-base min-w-32 md:text-lg text-ellipsis line-clamp-1 font-semibold">{product.productName}</h2>
                  <div className="flex gap-4">
                    <p className="capitalize font-semibold">{product.brandName}</p>
                    <p className="text-slate-900 capitalize text-ellipsis line-clamp-1">{product.category}</p>
                  </div>
                  <p className="text-md line-through text-gray-500">{INRcurrency(product.price)}</p>
                  <p className="text-xl font-semibold pb-2">{INRcurrency(product.sellingPrice)}</p>
                  <button
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full px-2 text-sm"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
                <div className="border-l border-gray-300 h-36 hidden md:block" />
                <div>
                  <p className="text-ellipsis line-clamp-6 h-36 hidden md:block overflow-y-scroll scrollbar-none overflow-x-hidden">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchVerticalCard;
