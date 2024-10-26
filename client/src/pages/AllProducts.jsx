import React, { useState } from 'react'
import UploadProducts from '../components/UploadProducts'
const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct]=useState(false)
  return (
    <div>
    <div className="bg-white py-2 px-4 flex justify-between items-center">
      <h1 className='font-bold text-lg'> All products</h1>
      <button className='border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors py-1 px-3 rounded-full 'onClick={()=>setOpenUploadProduct(true)}> Upload product</button>
    </div>
    {
      openUploadProduct&&(<UploadProducts onClose={()=>setOpenUploadProduct(false)}/>)
    }
    </div>
  )
}

export default AllProducts
