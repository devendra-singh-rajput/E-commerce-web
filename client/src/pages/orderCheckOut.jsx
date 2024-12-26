import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summmryApi from "../common";
import INRcurrency from "../helpers/displayCurrency";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const { productId } = useParams();
  const user = useSelector(state => state?.user?.user)
  const [productData, setProductData] = useState(null);
  const [userData, setUserData] = useState({
    name: user?.userDetail?.name || '',
    email: user?.email || '',
    pincode: user?.userDetail?.pincode || '',
    landmark: user?.userDetail?.landmark || '',
    address: user?.userDetail?.address || '',
    city: user?.userDetail?.city || '',
    state: user?.userDetail?.state || '',
    phoneNumber: user?.userDetail?.phoneNumber || '',
    alternatePhoneNumber: user?.userDetail?.alternatePhoneNumber || ''
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({})
  const [quantity, setQuantity] = useState(1);
  const [shippingCharge, setShippingCharge] = useState(50);
  const [tax, setTax] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [paymentStatus,setPaymentStatus]= useState("");



  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(summmryApi.productDetailes.url, {
          cache: 'force-cache',
          method: summmryApi.productDetailes.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productId:productId
          })
        });
        const dataResponse = await response.json();
        setProductData(dataResponse.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
      }
    };
    fetchProductDetails();
  }, [productId]);
  // setMobileNumber(userData.phoneNumber)
  useEffect(() => {
    if (productData) {
      const productPrice = productData.sellingPrice * quantity;
      setPrice(productData.sellingPrice)
      setTotalAmount(productPrice + shippingCharge + tax);
      setProductName(productData.productName)
      setProductImage(productData.productImage[0])
    }
  }, [quantity, shippingCharge, tax, productData]);

  const validateInput = () => {
    let newErrors = {};

    // Basic validation patterns
    const mobilePattern = /^\d{10}$/;
    const pincodePattern = /^\d{6}$/;

    if (!userData.name) newErrors.name = "Name is required";
    if (!userData.pincode || !pincodePattern.test(userData.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!userData.city) newErrors.city = "City is required";
    if (!userData.address) newErrors.address = "Address is required";
    if (!userData.state) newErrors.state = "State is required";
    if (userData.mobileNumber &&!mobilePattern.test(mobileNumber)) newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    if (userData.alternatePhoneNumber && !mobilePattern.test(userData.alternatePhoneNumber)) newErrors.alternatePhoneNumber = "Alternate phone number should be 10 digits";
    if (!otp && otpSent) newErrors.otp = "OTP is required after it's sent";
    if (!selectedPaymentMethod) newErrors.paymentMethod = "Please select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSendOtp = async () => {
  //   if (!mobileNumber || errors.mobileNumber) {
  //     alert("Please enter a valid 10-digit mobile number to receive OTP.");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const response = await fetch(summmryApi.sendSMS.url, {
  //       method: summmryApi.sendSMS.method,
  //       credentials:"include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ mobileNumber }),
  //     });
  //     const result = await response.json();
  //     setOtp(result.data)
  //     if (result.success) setOtpSent(true);
  //   } catch (error) {
  //     console.error("Failed to send OTP:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleRazorpayPayment = async () => {
    try {
      // Create Order
      const response = await fetch(summmryApi.createOrder.url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount, // Amount in rupees
          currency: "INR",
        }),
      });

      const { order } = await response.json();
      
      const options = {
        key: 'rzp_test_bUdMiy5zlXHAYF',
        amount: order.amount,
        currency: order.currency,
        name: "TechnoWorld",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify Payment
            const verificationResponse = await fetch(summmryApi.verifyPayment.url, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const result = await verificationResponse.json();

            if (result.success) {
              toast.success("Payment Successful!");
              handleOrderCreation("Paid");
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phoneNumber,
        },
        theme: {
          color: "#dc2626",
        },
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in Razorpay payment:", error);
      toast.error("Error initiating payment.");
    }
  };




  //cod order method 
  const handleOrderCreation = async (paymentStatus) => {
    if (!validateInput()) {
      alert("Please correct the errors before placing an order.");
      return;
    }
    try {
      setLoading(true)
      const response = await fetch(summmryApi.placeOrder.url, {
        method: summmryApi.placeOrder.method,
        credentials:'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity,
          productImage,
          productName,
          shippingCharge,
          tax,
          price,
          totalAmount,
          userData,
          otp,
          paymentStatus,
          paymentMethod: selectedPaymentMethod,
        }),
      });
      const result = await response.json();
      

      if (result.success) {
        toast.success(result.message)
        setLoading(false)

      }else{
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddressChange = (e) =>{
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
  }

  const DiscountPercentage = ((productData?.price - productData?.sellingPrice) / productData?.price) * 100;


  const handlePlaceOrder = () => {
    if (selectedPaymentMethod === "Card") {
      handleRazorpayPayment();
    } else {
      handleOrderCreation("COD");
    }
  };




  return (
    <div className="container mx-auto p-4 lg:flex lg:justify-between">
      <div className="w-full lg:w-3/5 p-4 bg-white rounded shadow-md space-y-6">
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text"required name="name" placeholder="Name" value={userData.name} onChange={handleAddressChange} className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full" />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <input type="text"required name="pincode" placeholder="Pincode" value={userData.pincode} onChange={handleAddressChange} className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full" />
            {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
            <input type="text"required name="city" placeholder="City" value={userData.city} onChange={handleAddressChange} className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full" />
            {errors.city && <p className="text-red-500">{errors.city}</p>}
            <input type="text" name="landmark"placeholder="Landmark"value={userData.landmark}onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
            <textarea name="address"required placeholder="Address" value={userData.address} onChange={handleAddressChange} className="border p-2 rounded w-full h-24 md:col-span-2 border-slate-400 hover:border-primary  hover:bg-slate-100 hover:shadow-md" />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <input type="text"required name="state" placeholder="State" value={userData.state} onChange={handleAddressChange}  className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full" />
            {errors.state && <p className="text-red-500">{errors.state}</p>}
            <input
              type="text"name="alternatePhoneNumber"placeholder="Alternate Phone Number"value={userData.alternatePhoneNumber}onChange={handleAddressChange}
              className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md  p-2 rounded w-full"
            />
          {errors.alternatePhoneNumber && <p className="text-red-500">{errors.alternatePhoneNumber}</p>}
          </form>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-3">Mobile Verification</h2>
          <input type="text"required placeholder="Enter Mobile Number"name="phoneNumber"  value={userData.phoneNumber}
          onChange={handleAddressChange} className="border-slate-400 hover:border-primary border hover:bg-slate-100 hover:shadow-md mb-3 p-2 rounded w-full" />
          {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}
          {/* {otpSent ? (
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="border p-2 rounded w-full" />
          ) : (
            <button onClick={handleSendOtp} className="px-4 py-2 bg-primary text-white rounded">Send OTP</button>
          )} */}
        </section>
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-3">Payment Options</h2>
          <label className="flex items-center mb-2">
            <input type="radio"required name="payment" value="COD"
              checked={selectedPaymentMethod === "COD"}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)} className="mr-2" /> Cash on Delivery
          </label>
          <label className="flex items-center">
            <input type="radio"required name="payment"
            //  disabled 
            
               value="Card"checked={selectedPaymentMethod === "Card"}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)} className="mr-2" /> Credit / Debit Card / UPI
          </label>
        </section>
      </div>

      {/* Right Section - Order Summary */}
      <div className="w-full lg:w-1/3 mt-6 lg:mt-0 p-4 h-fit bg-white rounded shadow-md">
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
          <p>Price</p>
          <p>₹{productData?.price}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount</p>
          <p>- ₹{(productData?.price-productData?.sellingPrice)*quantity}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Total before tax:</p>
          <p>₹{productData ? productData.sellingPrice * quantity : "..."}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Shipping & handling:</p>
          <p>₹{shippingCharge}</p>
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
          className={`w-full mt-4 px-4 py-2 bg-primary hover:bg-secondary text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
          {loading ? "Loading in..." : "Place Order"}
          
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
