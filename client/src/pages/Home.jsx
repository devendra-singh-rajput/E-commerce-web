import React, { useEffect } from "react";
import ProductCategoryList from "../components/ProductCategoryList";
import BennerProduct from "../components/BennerProduct";
import HorizontalProductCard from "../components/HorizontalProductCard";
import VerticalProductCard from "../components/verticalProductCard";
import ShowAllProducts from "../components/ShowAllProducts";
import { productCategroy, updateProductCategories } from "../helpers/productCategory";

const Home = () => {

  updateProductCategories();


  return (
    <div>
      {/* Render the product category list and banner */}
      <ProductCategoryList />
      <BennerProduct />

      {/* Render first two values for HorizontalProductCard */}
      {productCategroy.slice(0, 2).map((category, index) => (
        <HorizontalProductCard
          key={index}
          category={category.value}
          heading={`Top ${category.label}`}
        />
      ))}

      {/* Render the next five values for VerticalProductCard */}
      {productCategroy.slice(2, 7).map((category, index) => (
        <VerticalProductCard
          key={index}
          category={category.value}
          heading={category.label}
        />
      ))}

      {/* Show all products */}
      <ShowAllProducts />
      {/* {console.log(productCategroy)} */}
    </div>
  );
};

export default Home;
