import { useEffect, useState } from 'react' 
import { Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summmryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetaile } from './sotre/userSlice';
import './App.css'

function App() {
    const dispatch=useDispatch()
    const [countProductCart,setCountProductCart]=useState(0)
  const fetchUserDetail=async()=>{
    const dataResponce=await fetch(summmryApi.current_user.url,{
     method: summmryApi.current_user.method,
      headers: {
                "Content-Type": "application/json",
            },
     credentials:'include'
    })
    const dataApi= await dataResponce.json()
    if(dataApi.success){
      dispatch(setUserDetaile(dataApi.data))
    }
    return dataApi
  }
//  user cart 
  const userAddToCart= async()=>{
    const dataResponce=await fetch(summmryApi.countProductCart.url,{
      method: summmryApi.countProductCart.method,
       headers: {
                 "Content-Type": "application/json",
             },
      credentials:'include'
     })
     const dataApi= await dataResponce.json()
     setCountProductCart(dataApi.data)
     return dataApi

  }


  useEffect(()=>{
    fetchUserDetail()
    userAddToCart()
  },[])
  return (
    <>
     <Context.Provider value={{
       fetchUserDetail , //userDetailes
       countProductCart ,//  cart counts
       userAddToCart
    }}>

    <ToastContainer />

 <Header/>
 <main className='min-h-[calc(100vh-120px)] pt-16'>
 <Outlet/>
 </main>
 <Footer/>
 </Context.Provider>
    </>
  )
}

export default App
