import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../common';
import Context from '../context';
import INRcurrency from '../helpers/displayCurrency';
import { MdDeleteForever } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const loadingCart = new Array(context.countProductCart).fill(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(summaryApi.cartView.url, {
        method: summaryApi.cartView.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      });

      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }

    setLoading(false);
  };

  const updateQuantity = async (_id, newQty) => {
    try {
      const response = await fetch(summaryApi.updateCart.url, {
        method: summaryApi.updateCart.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id, quantity: newQty })
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const increaseQuantity = (_id, qty) => updateQuantity(_id, qty + 1);

  const decreaseQuantity = (_id, qty) => {
    if (qty > 1) {
      updateQuantity(_id, qty - 1);
    }
  };

  const deleteCartProduct=async(id)=>{
    try {
      const response = await fetch(summaryApi.deleteCartProduct.url, {
        method: summaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {_id:id})
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context?.userAddToCart()
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totalAmount = data.reduce((sum, product) => {
    return sum + product.productId.sellingPrice * product.quantity;
  }, 0);
   const totalQuantity= data.reduce((preveValue,currentValue)=>preveValue+currentValue.quantity,0)
  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3 font-semibold'>
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && data.length === 0 && (
          <p className='bg-white py-5'>NO DATA</p>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* View Product */}
        <div className='w-full max-w-3xl'>
          {loading ? (
            loadingCart.map((_, index) => (
              <div
                key={index}
                className='w-full bg-slate-200 my-3 border rounded border-slate-300 animate-pulse h-32'
              ></div>
            ))
          ) : (
            <div>
              {data.map((product) => (
                <div
                  key={product?._id}
                  className='w-full bg-white my-3 border rounded border-slate-300 h-32 grid grid-cols-[128px,1fr]'
                >
                  <div className='w-32 h-32 bg-slate-200 flex justify-center items-center'>
                    <img
                      src={product?.productId?.productImage[0]}
                      className='h-full w-full mix-blend-multiply object-scale-down'
                      alt={product?.productId?.productName || "Product"}
                    />
                  </div>

                  <div className='p-2 mx-2  relative'>
                    {/* dele te product */}
                    <div className='absolute right-0'>
                      {
                        <div
                        className='p-2 text-ellipsis  hover:text-white text-xl hover:bg-primary rounded-full cursor-pointer'
                        onClick={() => deleteCartProduct(product?._id)}>
                          
                        <MdDeleteForever />
                      </div>
                      }
                    </div>
                    <h2 className='text-lg lg:text-xl font-medium text-ellipsis line-clamp-1'>
                      {product?.productId?.productName}
                    </h2>
                    <p className='capitalize text-slate-500'>
                      {product?.productId?.category}
                    </p>
                    <div className='flex items-center justify-between'>
                    <p className='font-medium text-lg'>
                      {INRcurrency(product?.productId?.sellingPrice)}
                    </p>
                    <p className='font-medium text-slate-600 lg:text-lg'> 
                      {INRcurrency(product?.productId?.sellingPrice*product?.quantity)}
                    </p>
                    </div>
                    <div className='flex items-center gap-3 mt-2'>
                      <button
                        className='rounded pb-1 border hover:bg-primary hover:text-white border-primary text-primary h-6 w-6 flex justify-center items-center font-bold text-xl'
                        onClick={() => decreaseQuantity(product?._id, product?.quantity)}
                        disabled={product?.quantity <= 1}
                        aria-label="Decrease quantity">
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className='rounded pb-1 border hover:bg-primary hover:text-white border-primary text-primary h-6 w-6 flex justify-center items-center font-bold text-xl'
                        onClick={() => increaseQuantity(product?._id, product?.quantity)}
                        aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Summary Product */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {loading ? (
            <div className='h-36 bg-slate-200 my-3 border rounded border-slate-300 animate-pulse'></div>
          ) : (
            <div className='h-36 bg-white p-2 rounded border border-slate-300'>
              <h2 className='text-white bg-primary px-4 py-1 mb-2 rounded flex justify-center'>Summary</h2>
              
              <div className='flex justify-between items-center px-4'>
              <p className='text-lg font-semibold'>Total Quantity</p>
              <p className='font-medium text-lg'>{totalQuantity}</p>
              </div>
              <div className='flex justify-between items-center px-4'>
              <h2 className='text-lg font-semibold'>Total</h2>
              <p className='font-medium text-lg'>
                {INRcurrency(totalAmount)}
              </p>
              </div>
              <div className='flex '>
              <button className=' bg-blue-600 px-2  text-white rounded' > Payment </button>
              <BiMoneyWithdraw  /> 
              
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
