// BennerProduct.js
import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import summmryApi from '../common';
import axios from "axios";

const desktopImages = [];
const mobileImages = [];

console.log("banners",desktopImages,
  mobileImages)

const getBanners = async () => {
  try {
    const { data } = await axios.get(summmryApi.getCustomization.url, {
      withCredentials: true,
    });
     console.log("data",data)
    if (data.banners.desktop||data.banners.mobile) {

      desktopImages.push(...(data.banners.desktop || []));
      mobileImages.push(...(data.banners.mobile || []));
    }
  } catch (error) {
    console.error("Failed to fetch Banners:", error);
  }
};
getBanners();








const BennerProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px is mobile size
    };

    handleResize(); // Initialize screen size
    window.addEventListener('resize', handleResize);

    // Auto slide change every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : desktopImages.length));
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [isMobile]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const images = isMobile ? mobileImages : desktopImages;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Image */}
      <div className="w-full h-72 sm:h-74 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex  * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-20 p-2 rounded-full"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
      >
        <FaAngleLeft />
      </button>
      <button
        className="hidden md:block absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-20 p-2 rounded-full"
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}
      >
        <FaAngleRight />
      </button>

      {/* Bottom index points */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BennerProduct;
