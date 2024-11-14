import React from 'react'
import ProductCategoryList from '../components/ProductCategoryList';
import BennerProduct from '../components/BennerProduct';
import HorizontalProductCard from '../components/HorizontalProductCard';
import VerticalProductCard from "../components/verticalProductCard";

const Home = () => {
  return (
    <div>
      <ProductCategoryList />
      <BennerProduct/>
      <HorizontalProductCard category={"airpodes"}heading={"Top's Airpodes"}/>
      <HorizontalProductCard category={"earphones"}heading={"popular Earphones"}/>
      <VerticalProductCard category={"mobiles"}heading={"popular mobiles"}/>
      <VerticalProductCard category={"refrigerator"}heading={"refrigerator"}/>
      <VerticalProductCard category={"televisions"}heading={"televisions"}/> 
      <VerticalProductCard category={"camera"}heading={"camera"}/> 
      <VerticalProductCard category={"speakers"}heading={"speakers"}/> 
      <VerticalProductCard category={"watches"}heading={"Watches"}/> 
      <VerticalProductCard category={"trimmers"}heading={"Trimmers"}/> 
    </div>
  )
}

export default Home
