import React from 'react'

const adminProductCard = ({
    data ,key
}) => {
  return (
    <div>
      <div key={data._id || index} className="border p-4 bg-white rounded ">
            <img src={data?.productImage[0]} width={110} height={110} alt={data?.productName} />
            <h1 className='font-bold'>{data?.productName}</h1>
          </div>
    </div>
  )
}

export default adminProductCard
