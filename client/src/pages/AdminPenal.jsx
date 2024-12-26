import React, { useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPenal = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className='min-h-[calc(100vh-120px)] flex flex-col'>
      {/* Top Navigation for Mobile */}
      <nav className='bg-white shadow-md lg:hidden flex flex-wrap items-center justify-between p-2'>
        <div className='flex items-center space-x-4 m-2'>
          <div className='text-3xl cursor-pointer'>
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className='w-10 h-10 rounded-full'
                alt={user?.name}
              />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <div>
            <p className='capitalize text-sm font-semibold'>{user?.userName}</p>
            <p className='text-xs'>{user?.role}</p>
          </div>
        </div>
        <div className='flex flex-wrap '>
          <Link to={'Dashboard'} className='px-3 py-2 text-sm hover:bg-gray-200 font-semibold  rounded'>Dashboard</Link>
          <Link to={'all-users'} className='px-3 py-2 text-sm hover:bg-gray-200 font-semibold  rounded'>Users</Link>
          <Link to={'all-products'} className='px-3 py-2 text-sm hover:bg-gray-200 font-semibold  rounded'>Products</Link>
          <Link to={'all-orders'} className='px-3 py-2 text-sm hover:bg-gray-200 font-semibold  rounded'>Orders</Link>
          <Link to={'all-customization'} className='px-3 py-2 text-sm hover:bg-gray-200 font-semibold  rounded'>Customization</Link>
        </div>
      </nav>

      {/* Sidebar for Larger Screens */}
      <div className='lg:flex hidden flex-row'>
        <aside className='bg-white min-h-full w-full max-w-60 shadow-right-custom mr-2'>
          <div className='h-36 bg-slate-200 flex-col flex justify-center items-center shadow-md'>
            <div className='text-5xl cursor-pointer relative flex justify-center items-center h-32'>
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className='w-20 h-20 rounded-full'
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
            <p className='capitalize text-lg font-semibold'>{user?.userName}</p>
            <p className='text-sm'>{user?.role}</p>
          </div>

          {/* Navigation */}
          <div>
            <nav className='grid p-1'>
              <Link
                to={'Dashboard'}
                className='py-2 px-2 hover:bg-slate-100 border shadow-md m-1'
              >
                Dashboard
              </Link>
              <Link
                to={'all-users'}
                className='py-2 px-2 hover:bg-slate-100 border shadow-md m-1'
              >
                Users
              </Link>
              <Link
                to={'all-products'}
                className='py-2 px-2 hover:bg-slate-100 border mt-1 shadow-md m-1'
              >
                Products
              </Link>
              <Link
                to={'all-orders'}
                className='py-2 px-2 hover:bg-slate-100 border mt-1 shadow-md m-1'
              >
                Orders
              </Link>
              <Link
                to={'all-customization'}
                className='py-2 px-2 hover:bg-slate-100 border mt-1 shadow-md m-1'
              >
                Customization
              </Link>
            </nav>
          </div>
        </aside>
        <main className='w-full h-full p-2'>
          <Outlet />
        </main>
      </div>

      {/* Main Content for Mobile */}
      <main className='w-full h-full p-2 lg:hidden'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPenal;
