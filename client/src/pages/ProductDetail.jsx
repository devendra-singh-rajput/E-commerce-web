import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import summmryApi from '../common';
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import INRcurrency from '../helpers/displayCurrency';
import { FaCartArrowDown } from "react-icons/fa";
import { BsBagHeartFill } from "react-icons/bs";
import CategoryProductvertical from '../components/categoryProductvertical';
import Context from '../context';
import addToCart from '../helpers/addToCart';
const ProductDetail = () => {
  // Initialize state variables
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: '',
    sellingPrice: '',
  });
  const [loading, setLoading] = useState(false);
  const imageList = new Array(4).fill(null);
  const params = useParams();
  const [activeImage, setActiveImage] = useState("")
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })
  const [zoomImages,setZoomImages]=useState(false)
  const { userAddToCart } = useContext(Context);
  
  const handleAddToCart = (e, _id) => {
    e.stopPropagation();
    addToCart(e, _id);
    userAddToCart();
  };

  // Function to fetch product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(summmryApi.productDetailes.url, {
        cache: 'force-cache',
        method: summmryApi.productDetailes.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: params?.id
        })
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0])
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const onMouseEnterImage = (imageUrl) => {
    setActiveImage(imageUrl)
  }
  const zoomImage = useCallback((e) => {
    setZoomImages(true)
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

const leaveZoomImage=()=>{
  setZoomImages(false)
}
  return (
    <div className='container mx-auto p-4 '>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>

        {/* Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 items-center'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
            <img
              src={activeImage}
              className='h-full w-full mix-blend-multiply object-scale-down cursor-all-scroll'
              alt="Main Product"
              onMouseMove={(e) => zoomImage(e)}
              onMouseLeave={leaveZoomImage}
            />
             {/* zoom image */}
            {
             zoomImages&&(  <div className='hidden lg:block absolute min-w-[800px] min-h-[450px]
              bg-slate-200 p-1 -right-[810px] top-0 overflow-hidden rounded'>
                 <div
                   className='w-full h-full min-h-[450px] min-w-[750px] mix-blend-multiply scale-125'
                   style={{
                     backgroundImage: `url(${activeImage})`,
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                     backgroundSize: '200%' 
                   }}>
                 </div>
               </div>)
            }
           
          </div>
          <div className='h-full'>
            {loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full animate-pulse'>
                {imageList.map((_, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded' key={index}></div>
                ))}
              </div>
            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full '>
                {data?.productImage?.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`h-20 w-20 bg-slate-200 rounded p-1 transition-all 
                     ${hoveredIndex === index ? 'border-2 border-offset-4 border-blue-500' : ''}`}  // Adjust outline
                    onMouseEnter={() => setHoveredIndex(index)} // Set the index when hovered
                  >
                    <img
                      src={imageUrl}
                      className='h-full w-full mix-blend-multiply object-scale-down cursor-pointer hover:scale-110'
                      onMouseEnter={() => onMouseEnterImage(imageUrl)}
                      onClick={() => onMouseEnterImage(imageUrl)}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {
          loading ? (<div className='grid w-full gap-1'>
            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full px-2  inline-block'></p>
            <h2 className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'></h2>
            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'> </p>
            <div className='text-slate-300 animate-pulse h-6 lg:h-8  rounded-full flex items-center gap-1 text-2xl '>
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStarHalf />
            </div>
            <div className='flex items-center bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full my-1 gap-4  '>
              <p className=''></p>
              <p className='text-slate-500 line-through bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'></p>
            </div>
            <div className='flex items-start gap-5 my-2'>
              <button className='border-2 bg-slate-200 animate-pulse h-6 lg:h-8 w-full  py-1 justify-center flex items-center gap-1  hover:text-white transition-colors rounded px-2 font-medium min-w-[120px]'><BsBagHeartFill className='text-lg text-slate-300' /></button>
              <button className='border-2 bg-slate-200 animate-pulse h-6 lg:h-8 w-full  transition-colors rounded px-2 font-medium flex items-center gap-1  py-1 min-w-[130px]'> <FaCartArrowDown className='text-lg text-slate-300' /></button>
            </div>
            <div>
              <p className='text-slate-600 font-medium py-1  bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'  ></p>
              <p className=''> </p>
            </div>
          </div>


          ) : (


            <div className='flex flex-col gap-1 w-full'>
              <p className='bg-red-200 capitalize font-semibold text-lg text-primary rounded-full px-2 w-fit inline-block'>{data.brandName}</p>
              <h2 className='text-2xl capitalize lg:text-4xl font-medium'>{data.productName}</h2>
              <p className='capitalize text-slate-400'> {data.category}</p>
              <div className='text-primary flex items-center gap-1 text-2xl'>
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStar />
                <IoIosStarHalf />
              </div>
              <div className='flex items-center font-medium text-2xl lg:text-3xl my-1 gap-4  '>
                <p className=''>{INRcurrency(data.sellingPrice)}</p>
                <p className='text-slate-500 line-through text-lg'>{INRcurrency(data.price)}</p>
              </div>
              <div className='flex items-start gap-5 my-2'>
                <button className='border-2 border-primary py-1 justify-center flex items-center gap-1 text-primary hover:bg-primary hover:text-white transition-colors rounded px-2 font-medium min-w-[120px]'><BsBagHeartFill className='text-lg' />BUY</button>
                <button className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded px-2 font-medium flex items-center gap-1  py-1 min-w-[130px]'onClick={(e)=>handleAddToCart(e,data?._id)} > <FaCartArrowDown className='text-lg'
                  />ADD TO CART</button>
              </div>
              <div className=''>
                <p className='text-slate-600 font-medium py-1'>Discription</p>
                <p className='h-36 overflow-y-scroll scrollbar-none'> {data.description}</p>
              </div>


            </div>)
        }
      </div>


      <CategoryProductvertical category={data?.category}heading={"recommended product's"}/>
       
    </div>
  );
};

export default ProductDetail;
