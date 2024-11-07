import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import EditProduct from './EditProduct';
import INRcurrency from '../helpers/displayCurrency';
import ReactDOM from 'react-dom';
import summmryApi from '../common';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);


  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${summmryApi.deleteProduct.url}/${id}`, {
        withCredentials: true,
      });
  
      // Check if deletion was successful
      if (response.status === 200) {
        // Use `response.data.message` for the server message if available
        toast.success(response.data.message || 'Product deleted successfully!');  
        fetchData()
      } else {
        toast.error('Failed to delete product.'); 
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product: ' + (error.response?.data?.message || error.message)); 
    }
  };
  


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
        </div>

        <div className='flex justify-between items-center w-full'>
          <div className='font-semibold '>
            {INRcurrency(data?.sellingPrice)}
          </div>

          <div className='flex ml-16 items-center space-x-2'>
            <div
              className='bg-green-200 cursor-pointer p-2 hover:bg-green-500 hover:text-white rounded-full'
              onClick={() => setEditProduct(true)}>
              <CiEdit />
            </div>

            <div
              className='p-2 text-ellipsis hover:text-white bg-red-300 hover:bg-primary rounded-full cursor-pointer'
              onClick={() => deleteProduct(data?._id)}>
                
              <MdDeleteForever />
            </div>
          </div>
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
