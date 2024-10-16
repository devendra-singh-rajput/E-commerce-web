import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const AdminPenal = () => {
  const user = useSelector(state => state?.user?.user)
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 shadow-right-custom'>
      <div className='h-32 bg-primary flex-col flex justify-center items-center rounded '>
      <div className='text-5xl cursor-pointer relative flex justify-center items-center h-32'>
            {
              user?.profilePic ? (<img src={user?.profilePic} className='w-20 h-20 rounded-full ' alt={user?.name} />) : (<FaRegUserCircle />)
            }
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.userName}</p>
          <p className='text-sm'>{user?.role}</p>

      </div>

      {/* navigation */}
        <div>
          <nav className='grid p-4'>
            <Link to={'all-users'}className='py-2 px-1 hover:bg-slate-100'>All User</Link>
            <Link to={'all-products'}className='py-2 px-1 hover:bg-slate-100'>All Products</Link>


          </nav>
        </div>

      </aside>
      <main className='w-full h-full p-2'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPenal
