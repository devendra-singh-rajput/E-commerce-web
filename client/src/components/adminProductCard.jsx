import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import EditProduct from './EditProduct';
import INRcurrency from '../helpers/displayCurrency';
import ReactDOM from 'react-dom';

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <>
      <div 
        className="border p-4 bg-white rounded w-64 h-65 flex flex-col items-center 
                   transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-md"
      >
        <img 
          src={data?.productImage[0]} 
          alt={data?.productName} 
          className='w-36 h-36 object-contain ' 
        />
        <div className='flex justify-between items-center w-full mt-2'>
          <h1 className='font-bold capitalize text-center text-ellipsis line-clamp-2'>{data?.productName}</h1>
          <div 
            className='bg-green-200 cursor-pointer p-2 hover:bg-green-500 hover:text-white rounded-full'
            onClick={() => setEditProduct(true)}
          >
            <CiEdit />
          </div>
        </div>
        <div className='font-semibold'>
          {INRcurrency(data?.sellingPrice)}
        </div>
      </div>

      {editProduct && ReactDOM.createPortal(
        <EditProduct 
          productData={data} 
          onClose={() => setEditProduct(false)} 
          fetchData={fetchData} 
        />,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default AdminProductCard;
