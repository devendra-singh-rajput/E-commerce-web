import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summmryApi from "../common";
import INRcurrency from "../helpers/displayCurrency";

const CheckoutPage = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    pincode: "",
    locality: "",
    landmark: "",
    address: "",
    street: "",
    city: "",
    state: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [shippingCharge, setShippingCharge] = useState(50); // Default shipping charge
  const [tax, setTax] = useState(0); // Tax placeholder
  const [totalAmount, setTotalAmount] = useState(0); // Calculated total amount

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(summmryApi.productDetailes.url, {
          cache: "force-cache",
          method: summmryApi.productDetailes.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
          }),
        });
        const dataResponse = await response.json();
        setProductData(dataResponse?.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (productData) {
      // Recalculate total amount whenever quantity or productData changes
      const productPrice = productData.sellingPrice * quantity;
      setTotalAmount(productPrice + shippingCharge + tax);
      
    }
  }, [quantity, shippingCharge, tax, productData]);
  
  const handleSendOtp = () => {
    setOtpSent(true);
    console.log("OTP sent to mobile:", mobileNumber);
  };
  
  const handlePlaceOrder = () => {
    console.log("Order placed with details:", userData);
  };
  
  const handleAddressChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const DiscountPercentage = ((productData?.price - productData?.sellingPrice) / productData?.price) * 100;
  
  return (
    <div className="container mx-auto p-4 lg:flex lg:justify-between">
      {/* Left Section - Address, Delivery, Payment */}
      <div className="w-full lg:w-3/5 p-4 bg-white rounded shadow-md space-y-6">
        {/* 1. Delivery Address */}
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address inputs */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userData.name}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={userData.pincode}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <input
              type="text"
              name="locality"
              placeholder="Locality"
              value={userData.locality}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={userData.landmark}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={userData.address}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full h-24 md:col-span-2 resize-none"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={userData.street}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <input
              type="text"
              name="city"
              placeholder="City/Town"
              value={userData.city}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={userData.state}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <input
              type="text"
              name="alternatePhoneNumber"
              placeholder="Alternate Phone Number"
              value={userData.alternatePhoneNumber}
              onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
          </form>
        </section>

        {/* 2. Mobile Number & OTP Validation */}
        <section className=" pb-4">
          <h2 className="text-xl font-semibold mb-3">Mobile Verification</h2>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full mb-3"
          />
          {otpSent ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-1/2"
              />
            </div>
          ) : (
            <button
              onClick={handleSendOtp}
              className="px-4 py-2 border-primary text-gray-900 border-2 hover:bg-primary hover:text-white rounded font-medium"
            >
              Send OTP
            </button>
          )}
        </section>

        {/* 3. Payment Method */}
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-3">Payment Options</h2>
          <label className="flex items-center mb-2">
            <input type="radio" name="payment" className="mr-2" /> Cash on Delivery
          </label>
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" /> Credit / Debit Card
          </label>
        </section>
      </div>

      {/* Right Section - Order Summary */}
      <div className="w-full lg:w-1/3 mt-6 lg:mt-0 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

        {productData ? (
          <div className="flex items-center mb-4 ">
            <img
              src={productData.productImage[0]}
              alt={productData.name}
              className="w-32 h-32 object-scale-down rounded mr-4 mix-blend-multiply  "
            />
            <div>
              <h3 className="text-lg font-medium">{productData.productName}</h3>
              <p className="text-md line-through text-gray-500">{INRcurrency(productData.price)}</p>
              <p className="text-xl font-semibold  pb-2">{INRcurrency(productData.sellingPrice)} <span className="text-xl font-bold text-green-600 ml-2">{DiscountPercentage.toFixed()}% off</span> </p>
           
            <div className="flex items-center m-4">
              <button
                onClick={decreaseQuantity}
                className="rounded pb-1 border hover:bg-primary hover:text-white border-primary text-primary h-6 w-6 flex justify-center items-center font-bold text-xl"
              >
                -
              </button>
              <p className="mx-2">{quantity}</p>
              <button
                onClick={increaseQuantity}
                className="rounded pb-1 border hover:bg-primary hover:text-white border-primary text-primary h-6 w-6 flex justify-center items-center font-bold text-xl"
              >
                +
              </button>
            </div>
            </div>
          </div>
        ) : (
          <p>Loading product...</p>
        )}

        <hr className="my-3" />

        {/* Extra Charges */}
        <div className="flex justify-between mb-2">
          <p>Shipping & handling:</p>
          <p>₹{shippingCharge}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Total before tax:</p>
          <p>₹{productData ? productData.sellingPrice * quantity : "..."}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Estimated tax:</p>
          <p>₹{tax}</p>
        </div>

        {/* Total Summary */}
        <div className="flex justify-between">
          <p className="font-semibold">Total Amount</p>
          <p className="font-semibold">₹{totalAmount}</p>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
