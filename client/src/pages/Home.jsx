import React, { useEffect, useState } from "react";
import ProductCategoryList from "../components/ProductCategoryList";
import BennerProduct from "../components/BennerProduct";
import HorizontalProductCard from "../components/HorizontalProductCard";
import VerticalProductCard from "../components/verticalProductCard";
import ShowAllProducts from "../components/ShowAllProducts";
import { productCategroy, updateProductCategories } from "../helpers/productCategory";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await updateProductCategories();
      setCategories(productCategroy); // Ensure you set the categories after data update
    };
    
    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      {/* Render the product category list and banner */}
      <ProductCategoryList />
      <BennerProduct />
      
      {/* Render first two values for HorizontalProductCard */}
      {categories.slice(0, 2).map((category, index) => (
        <HorizontalProductCard
          key={index}
          category={category.value}
          heading={`Top ${category.label}`}
        />
      ))}
      
      {/* Render the next five values for VerticalProductCard */}
      {categories.slice(2, 7).map((category, index) => (
        <VerticalProductCard
          key={index}
          category={category.value}
          heading={category.label}
        />
      ))}
      
      {/* Show all products */}
      <ShowAllProducts />
    </div>
  );
};

export default Home;
