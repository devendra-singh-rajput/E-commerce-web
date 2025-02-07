import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import summmryApi from "../common";
import CancelOrderPopup from "../components/CancelOrderPopup";

const AllOrders = () => {
  const [parentOrders, setParentOrders] = useState([]); // Holds the parent order data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const[cencelOrder,setCencelOrder]=useState('')
  const[perentCencelOrder,setPerentCencelOrder]=useState('')

  const handleCancelClick = (parentOrder,order) => {
     // Set the selected order
     setPerentCencelOrder(parentOrder)
     setCencelOrder(order)
    setIsPopupOpen(true); // Open the popup
  };

  const handlePopupClose = () =>  setIsPopupOpen(false);

  const handlePopupSubmit = (parentOrder,orderId, reason) => {
    // Update the order status with the reason
    updateOrder(parentOrder,orderId, {
      status: "Cancelled",
      expectedDelivery: reason,
    });

    setIsPopupOpen(false); // Close the popup after submission
    setPerentCencelOrder('')
    setCencelOrder('')
     // Clear selected order
  };

  // Fetch all parent orders with nested orders
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(summmryApi.getAllOrders.url, {
        withCredentials: true,
      });
      const ordersData = response.data?.data || [];
      setParentOrders(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Update a specific nested order
  const updateOrder = async (parentOrderId, orderId, updatedFields) => {
    try {
      const response = await axios.put(
        summmryApi.updateOrders.url,
        { parentOrderId, orderId, ...updatedFields },
        { withCredentials: true }
      );
      const updatedOrder = response.data.data;

      // Update the local state
      setParentOrders((prevParentOrders) =>
        prevParentOrders.map((parentOrder) => {
          if (parentOrder._id === parentOrderId) {
            return {
              ...parentOrder,
              orders: parentOrder.orders.map((order) =>
                order._id === orderId ? { ...order, ...updatedOrder } : order
              ),
            };
          }
          return parentOrder;
        })
      );
      alert("Order updated successfully");
    } catch (err) {
      console.error(`Error updating order ${orderId}:`, err);
      alert("Failed to update order");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        <p className="ml-3 text-xl text-primary font-medium">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="bg-white py-4 px-4 flex justify-between items-center shadow-md mb-4 ">
        <h1 className='font-bold text-lg'>Manage Orders</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-190px)] overflow-y-scroll ">
        {parentOrders.length > 0 ? (
          parentOrders.map((parentOrder) =>
            parentOrder.orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg border-t-4 border-primary p-4 hover:shadow-xl transition-shadow"
              >
                <div className="text-gray-700">
                  <h2 className="text-sm font-bold mb-1">Order ID: {order._id}</h2>
                  <p className="text-sm">
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-white ${order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Shipped"
                            ? "bg-blue-500"
                            : order.status === "Cancelled"
                              ? "bg-red-500"
                              : "bg-green-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-bold">Buyer Information:</h3>
                  <p className="text-xs font-bold">
                    <strong className="text-sm font-bold ">Name:</strong> {order.userDetail.name}
                  </p>
                  <p className="text-xs font-bold">
                    <strong className="text-sm font-bold ">Contact:</strong> {order.userDetail.phoneNumber}, {order.userDetail.alternatePhoneNumber}
                  </p>
                  <p className="text-xs">
                    <strong className="text-sm font-bold">Address:</strong> {order.userDetail.address},{" "}
                    {order.userDetail.landmark},{" "}
                    {order.userDetail.city}, {order.userDetail.state} -{" "}
                    {order.userDetail.pincode}
                  </p>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-semibold">Products:</h3>
                  <ul className="list-disc ml-4 text-xs">
                    {order.products.map((product) => (
                      <li key={product.productId} className="flex items-start mb-2">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-8 h-8 rounded object-contain mr-2"
                        />
                        <div>
                          <p className="font-medium">{product.productName}</p>
                          <p>
                            Qty: {product.quantity} | ₹{product.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 border-t pt-3">
                  <p className="text-xs mb-2 flex justify-between">
                    <strong>Payment Status:</strong>{" "}
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        updateOrder(parentOrder._id, order._id, { paymentStatus: e.target.value })
                      }
                      className="bg-gray-200 border rounded p-1 text-xs w-40"
                      disabled={order.status === "Cancelled"}
                    >{
                        order.status === "Cancelled" ?
                          <option value="">--</option>
                          :
                          (<><option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Failed">Failed</option></>)
                      }

                    </select>
                  </p>
                  <p className="text-xs mb-2 flex justify-between">
                    <strong>Shipping Charges:</strong>{" "}
                    <input disabled
                      type="number"
                      placeholder="default 50+ more"
                      value={order.shippingCharge || ""}
                      onChange={(e) =>
                        updateOrder(parentOrder._id, order._id, { shippingCharges: e.target.value })
                      }
                      className="bg-gray-200 border rounded p-1 text-xs w-40"
                    />
                  </p>
                  <p className="text-xs mb-2 flex justify-between">
                    <strong>Expected Delivery:</strong>{" "}
                    <input
                      type="date"
                      value={
                        order.status === "Cancelled"
                          ? "Your order has been canceled."
                          : order.expectedDelivery || ""
                      }
                      onChange={(e) =>
                        updateOrder(parentOrder._id, order._id, {
                          expectedDelivery: e.target.value,
                        })
                      }
                      className="bg-gray-200 border rounded p-1 text-xs w-40"
                      readOnly={order.status === "Cancelled"}
                      disabled={order.status === "Cancelled"}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        updateOrder(parentOrder._id, order._id, {
                          status: order.status === "Shipped" ? "Delivered" : "Shipped",
                        })
                      }
                      disabled={order.status === "Delivered" ||order.status ==="Cancelled"}
                      className={`${order.status === "Shipped" || order.status === "Delivered" ? "bg-green-600" : "bg-blue-600"
                        } text-white px-3 py-1 rounded hover:opacity-90 ${order.status === "Delivered" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      {order.status === "Shipped" ? "Mark as Delivered" : (order.status === "Delivered" ? "Delivered" : "Mark as Shipped")}
                    </button>

                    <button
                      onClick={() =>
                        handleCancelClick(parentOrder._id, order._id)
                      }
                      disabled={order.status === "Delivered" ||order.status === "Cancelled"}
                      className={`px-3 py-1 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded ${order.status === "Delivered" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      Cancel Order
                    </button>
                      {/* Popup Integration */}
      {cencelOrder && (
        <CancelOrderPopup
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          onSubmit={handlePopupSubmit}
          orderId={cencelOrder}
          parentOrder={perentCencelOrder}
        />
      )}

                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
