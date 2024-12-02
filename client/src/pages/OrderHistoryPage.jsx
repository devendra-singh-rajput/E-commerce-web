import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import summmryApi from '../common';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useSelector((state) => state?.user?.user?._id);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get(summmryApi.getOrderHistory.url, { withCredentials: true });
                setOrders(response.data.data);
            } catch (error) {
                setError('Failed to load order history');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Order History</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((orderGroup) =>
                    orderGroup.orders.map((order) => (
                        <div key={order._id} className="bg-white border border-red-200 rounded-lg shadow-lg p-6 transition hover:border-red-500">
                            <h3 className="text-sm font-semibold ">Order ID: {order._id}</h3>
                            <p className="text-sm text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <div className="border-t border-red-200 my-4"></div>
                            <p className='flex justify-between'><span className="font-semibold  ">Total Amount  :</span> <span>₹{order.totalAmount}</span></p>
                            <p className='flex justify-between'><span className="font-semibold  ">Status  :</span> <span>{order.status}</span></p>
                            <p className='flex justify-between'><span className="font-semibold  ">Payment Status  :</span> <span>{order.paymentStatus}</span></p>
                            <p className='flex justify-between'><span className="font-semibold  ">Delivery Option  :</span> <span>{order.deliveryOption}</span></p>
                            {order?.expectedDelivery ? (
                                <p className='flex justify-between'>
                                    <span className="font-semibold">Expected Delivery:</span>
                                    <span>{order.expectedDelivery}</span>
                                </p>
                            ) : (
                                <p className='flex justify-between'>
                                </p>
                            )}

                            <h4 className="mt-4 mb-2 font-semibold text-red-700">Products:</h4>
                            <ul className="space-y-2">
                                {order.products.map((item) => (
                                    <li key={item._id} className="flex items-center space-x-4 border border-red-100 p-2 rounded hover:border-red-500">
                                        <img src={item.productImage} alt="Product" className="h-16 w-16 object-scale-down rounded" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-red-700">{item.productName}</p>
                                            <p className="text-sm">Quantity: {item.quantity}</p>
                                            <p className="text-sm">Price: ₹{item.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
