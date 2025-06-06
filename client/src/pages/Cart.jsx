import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../common';
import Context from '../context';
import INRcurrency from '../helpers/displayCurrency';
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const context = useContext(Context);
  const loadingCart = new Array(context.countProductCart).fill(null);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/CheckoutPage', {
      state: { data }, // Pass data via state
    });
  };

  // Fetch cart data
  const fetchData = async () => {
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
        setData(responseData.data.items || []); // Ensure `items` array is retrieved
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } 
  };

  // Update product quantity in cart
  const updateQuantity = async (productId, newQty) => {
    try {
      const response = await fetch(summaryApi.updateCart.url, {
        method: summaryApi.updateCart.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, quantity: newQty })
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData(); // Refresh cart data after quantity update
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Increase product quantity
  const increaseQuantity = (e,productId, qty) =>{
    e?.stopPropagation(); 
    e?.preventDefault();
    updateQuantity(productId, qty + 1);
  }

  // Decrease product quantity
  const decreaseQuantity = (e,productId, qty) => {
    e?.stopPropagation(); 
    e?.preventDefault();
    if (qty > 1) {
      updateQuantity(productId, qty - 1);
    }
  };

  // Delete product from cart
  const deleteCartProduct = async (e,productId) => {
    e?.stopPropagation(); 
    e?.preventDefault();
    try {
      const response = await fetch(summaryApi.deleteCartProduct.url, {
        method: summaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })  // Send the correct productId
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData(); // Refresh cart data after deletion
        context?.userAddToCart(); // Update cart count in context if available
      } else {
        setError(responseData.message); // Show the error message from the backend
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product.");
    }
  };
const handelLoading = async () => {
         await fetchData();
}

  useEffect(() => {
    setLoading(true)
    handelLoading()
    setLoading(false)
  }, []);

  // Calculate total amount and total quantity
  const totalAmount = data.reduce((sum, product) => sum + product.productId.sellingPrice * product.quantity, 0);
  const totalQuantity = data.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3 font-semibold'>
        {error && <p className='text-red-500'>{error}</p>}
        {!loading && data.length === 0 && <p className='bg-white py-5'>LOADING...!</p>}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/* View Products */}
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
                <Link
                to={"/productDetail/"+product.productId?._id}
                  key={product._id}
                  className='w-full bg-white my-3 border rounded border-slate-300 h-32 grid grid-cols-[128px,1fr]'
                >
                  <div className='w-32 h-32 bg-slate-200 flex justify-center items-center'>
                    <img
                      src={product.productId.productImage[0]}
                      className='h-full w-full mix-blend-multiply object-scale-down'
                      alt={product.productId.productName || "Product"}
                    />
                  </div>

                  <div className='p-2 mx-2 relative'>
                    {/* Delete Product */}
                    <div className='absolute right-0'>
                      <div
                        className='p-2 text-ellipsis hover:text-white text-xl hover:bg-primary rounded-full cursor-pointer'
                        onClick={(e) => deleteCartProduct(e,product.productId._id)}
                      >
                        <MdDeleteForever />
                      </div>
                    </div>
                    <h2 className='text-lg lg:text-xl font-medium text-ellipsis line-clamp-1'>
                      {product.productId.productName}
                    </h2>
                    <p className='capitalize text-slate-500'>
                      {product.productId.category}
                    </p>
                    <div className='flex items-center justify-between'>
                      <p className='font-medium text-lg'>
                        {INRcurrency(product.productId.sellingPrice)}
                      </p>
                      <p className='font-medium text-slate-600 lg:text-lg'>
                        {INRcurrency(product.productId.sellingPrice * product.quantity)}
                      </p>
                    </div>
                    <div className='flex items-center gap-3 mt-2'>
                      <button
                        className='rounded pb-1 border hover:bg-primary hover:text-white border-primary text-primary h-6 w-6 flex justify-center items-center font-bold text-xl'
                        onClick={(e) => decreaseQuantity(e,product.productId._id, product.quantity)}
                        disabled={product.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className='rounded pb-1 border hover:bg-primary hover:text-white border-primary text-primary h-6 w-6 flex justify-center items-center font-bold text-xl'
                        onClick={(e) => increaseQuantity(e,product.productId._id, product.quantity)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Total Summary */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {loading ? (
            <div className='h-36 bg-slate-200 my-3 border rounded border-slate-300 animate-pulse'></div>
          ) : (
            <div className='h-40 bg-white p-2 rounded border border-slate-300'>
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
              <div className='flex justify-evenly my-3'>
                <button className='border-2 border-primary hover:bg-primary px-2 hover:text-white text-primary font-semibold rounded' onClick={handleCheckout}>Payment</button>
                
              <Link to={"/OrderHistoryPage"} className='border-2 border-primary font-semibold hover:bg-primary px-2 hover:text-white text-primary rounded'>Order History</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
