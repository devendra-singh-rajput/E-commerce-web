// BennerProduct.js
import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// Import images
import img1_webp from '../assest/banner/img1.webp';
import img2_webp from '../assest/banner/img2.webp';
import img3_jpg from '../assest/banner/img3.jpg';
import img4_jpg from '../assest/banner/img4.jpg';
import img5_webp from '../assest/banner/img5.webp';
import img1_mobile from '../assest/banner/img1_mobile.jpg';
import img2_mobile from '../assest/banner/img2_mobile.webp';
import img3_mobile from '../assest/banner/img3_mobile.jpg';
import img4_mobile from '../assest/banner/img4_mobile.jpg';
import img5_mobile from '../assest/banner/img5_mobile.png';

const desktopImages = [img1_webp, img2_webp, img3_jpg, img4_jpg, img5_webp];
const mobileImages = [img1_mobile, img2_mobile, img3_mobile, img4_mobile, img5_mobile];

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