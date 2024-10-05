import { useState } from 'react' 
import { Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css'

function App() {

  return (
    <>
<ToastContainer />

 <Header/>
 <main className='min-h-[calc(100vh-120px)]'>
 <Outlet/>
 </main>
 <Footer/>
    </>
  )
}

export default App
