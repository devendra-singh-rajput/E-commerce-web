import React, { useState } from 'react'
import signin from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword,setShowPassword]=useState(false)
    return (
        <section id="login">
            <div className='mx-auto container p-4'>
                <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded">
                    <div className='w-20 h-20 mx-auto '>
                        <img src={signin} alt="signin icon" />
                    </div>
                    <form action="">
                        <div className='grid'>
                            <label> Email :</label>
                            <div className='bg-slate-100 p-2'> <input type="email" name="" placeholder='enter  email' id="" className='w-full h-full outline-none bg-transparent rounded' />
                            </div>
                        </div>
                        <div>
                            <label> password :</label>
                            <div className='bg-slate-100 p-2 flex'> <input type={showPassword? "text":"password"} name="" placeholder='enter  password' id="" className='w-full h-full outline-none bg-transparent rounded' />
                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}> 
                                
                                {
                                    showPassword?(<FaEye/>):(<FaEyeSlash/>)
                                }
                                
                            </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-blue-600' > Forgot password</Link>
                        </div>
                        <button className='bg-red-600 text-white w-full max-w-[200px] rounded-full hover:scale-105 transition-all mx-auto block px-6 py-2 mt-6'>Login</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login   
