import { useEffect, useState } from 'react' 
import { Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summmryApi from './common';
import Context from './context';
// import './App.css'

function App() {
  const fetchUserDetail=async()=>{
    const dataResponce=await fetch(summmryApi.current_user.url,{
     method: summmryApi.current_user.method,
     credentials:'include'
    })
    const dataApi= await dataResponce.json()
    return dataApi
  }
  useEffect(()=>{
    fetchUserDetail()
  },[])
  return (
    <>
     <Context.Provider value={{
       fetchUserDetail 
    }}>

    <ToastContainer />

 <Header/>
 <main className='min-h-[calc(100vh-120px)]'>
 <Outlet/>
 </main>
 <Footer/>
 </Context.Provider>
    </>
  )
}

export default App
