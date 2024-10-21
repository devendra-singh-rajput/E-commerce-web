import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import summmryApi from '../common';
import { toast } from 'react-toastify';

const ChangeRole = ({
    userId, userName,email,role,onClose
}) => {
    const [userRole,setUserRole]= useState(role)
    const hendelUserRole=(e)=>{
        setUserRole(e.target.value)
        console.log(e.target.value)
    }
    const updateUserRole =async()=>{
       const fetchResponce= await fetch(summmryApi.updateUser.url,{
        method:summmryApi.updateUser.method,
        credentials:"include",
        headers:{
             "Content-Type": "application/json"
        },
        body:JSON.stringify({
            userId:userId,
            role :userRole
        })
       })
       const dataResponce= await fetchResponce.json()

       if (dataResponce.success) {
        toast.success(dataResponce.message)
        onClose()
       }
       console.log("responce data",dataResponce)
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50 '>
     <div className='bg-white shadow-md p-4 w-full max-w-sm mx-auto rounded '>
        <button className='block ml-auto'onClick={onClose}>
        <IoClose />
        </button>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
        <p>name :  {userName}</p>
        <p>email : {email}</p>
        <div className='flex items-center justify-between my-4'>
            <p>Role :</p>
            <select className='border px-4py-1 'value={userRole}onChange={hendelUserRole}> 
            {
                Object.values(ROLE).map(el=>{
                     return(
                        <option value={el}key={el}>{el}</option>
                     )
                })
            }
        </select>
        </div>
        <button className='w-fit mx-auto block h-9  py-1 px-3 rounded-full bg-primary text-white  hover:bg-secondary'onClick={updateUserRole}>Change Role</button>
     </div>
    </div>
  )
}

export default ChangeRole
