import React from 'react'
import { useParams } from 'react-router-dom'

const ProductCategory = () => {
    const param =useParams()
    
  return (
    <div>
      {param.categoryName}
    </div>
  )
}

export default ProductCategory
