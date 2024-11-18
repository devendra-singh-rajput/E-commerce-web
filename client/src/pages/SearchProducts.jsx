import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summmryApi from '../common'
import SearchVerticalCard from '../components/searchVerticalCard'

const SearchProducts = () => {
  const qurey=useLocation()
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)

  const fetchProducts = async ()=>{
    setLoading(true)
    const response= await fetch(summmryApi.search.url+qurey.search)
    const responseData= await response.json()
    setLoading(false)
    setData(responseData.data)
  }

  useEffect(()=>{
    fetchProducts()
  },[qurey])

  return (
    <div className='container mx-auto p-4'>
      {
        loading&&(
          <p className='text-lg text-center '>loading....</p>
        )
      }
      {
        data.length===0&& !loading&&(
          <p className='bg-white texxt-lg text-center p-4 font-semibold'>NO DATA FOUND.....</p>
        )
      }
      <p className='text-lg font-semibold p-3'>Search Result : {data.length}</p>
     
     {
      data.length !==0 && !loading && (
       
            <SearchVerticalCard loading={loading} data={data}/>
         
      )
     }
    </div>
  )
}

export default SearchProducts
