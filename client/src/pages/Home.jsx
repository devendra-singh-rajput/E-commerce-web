import React from 'react'
import ProductCategoryList from '../components/ProductCategoryList';
import BennerProduct from '../components/BennerProduct';
import HorizontalProductCard from '../components/HorizontalProductCard';
import VerticalProductCard from "../components/verticalProductCard";
import ShowAllProducts from '../components/ShowAllProducts';

const Home = () => {
  return (
    <div>
      <ProductCategoryList />
      <BennerProduct/>
      <HorizontalProductCard category={"airpodes"}heading={"Top's Airpodes"}/>
      <HorizontalProductCard category={"earphones"}heading={"popular Earphones"}/>
      <VerticalProductCard category={"mobiles"}heading={"popular mobiles"}/>
      <VerticalProductCard category={"televisions"}heading={"televisions"}/> 
      <VerticalProductCard category={"camera"}heading={"camera"}/> 
      <VerticalProductCard category={"watches"}heading={"Watches"}/> 
      <VerticalProductCard category={"trimmers"}heading={"Trimmers"}/> 
      <ShowAllProducts/>
    </div>
  )
}

export default Home
