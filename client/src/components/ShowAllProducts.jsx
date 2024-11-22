import React, { useEffect, useState } from 'react'
import summmryApi from '../common';
import SearchVerticalCard from '../components/searchVerticalCard'

const ShowAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
    const fetchAllProducts = async () => {
      setLoading(true)
        try {
          const response = await fetch(summmryApi.getProducts.url);
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const dataResponse = await response.json();
          setAllProducts(dataResponse.data || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchAllProducts();
      }, []);
  return (
    <div className='mx-3 mb-4 '>
       <h1 className='text-2xl font-semibold px-3 py-4 capitalize'>All Products</h1>
       {
      allProducts.length !==0 && !loading && (
       
            <SearchVerticalCard loading={loading} data={allProducts}/>
          
      )
     }
    </div>
  )
}

export default ShowAllProducts
