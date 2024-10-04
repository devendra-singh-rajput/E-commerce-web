import React, { useState } from 'react'
import signin from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import imageToBase64 from '../helpers/imgToBase64';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
        , profilePic: ""
    })
    const hendelOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value

            }
        })
    }
    const hendelUploadPic=async(e)=>{
        const file =e.target.files[0]
        const profilepic= await imageToBase64(file)
        setData((prev) => {
            return {
                ...prev,
                profilePic:profilepic

            }
        })
        

    }

    const hendelSubmit = (e) => {
        e.preventDefault()
    }
    // console.log("data login ",data)
    return (
        <section id="SignUp">
            <div className='mx-auto container p-4'>
                <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto ">
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div >
                            <img src={data.profilePic || signin} alt="signin icon" />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs bg-slate-200 bg-opacity-80 pb-5 cursor-pointer absolute bottom-0 w-full'>
                                    Upload Photo
                                </div>
                                <input type="file" name=""  className='hidden' onChange={hendelUploadPic} />
                            </label>
                        </form>
                    </div>
                    <form onSubmit={hendelSubmit} className='p-5 flex flex-col gap-2'>
                        <div className='grid'>
                            <label> UserName :</label>
                            <div className='bg-slate-100 p-2'> <input type="text"
                                name="userName"
                                value={data.userName}
                                onChange={hendelOnChange}required
                                placeholder='enter your name'  className='w-full h-full outline-none bg-transparent rounded' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label> Email :</label>
                            <div className='bg-slate-100 p-2'> <input type="email"
                                name="email"
                                value={data.email}
                                onChange={hendelOnChange}required
                                placeholder='enter  email'  className='w-full h-full outline-none bg-transparent rounded' />
                            </div>
                        </div>
                        <div>
                            <label> Password :</label>
                            <div className='bg-slate-100 p-2 flex'> <input type={showPassword ? "text" : "password"} name="password"
                                value={data.password}
                                onChange={hendelOnChange}required
                                placeholder='enter  password'  className='w-full h-full outline-none bg-transparent rounded' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>

                                    {
                                        showPassword ? (<FaEye />) : (<FaEyeSlash />)
                                    }

                                </div>
                            </div>

                        </div>
                        <div>
                            <label> Confirm password :</label>
                            <div className='bg-slate-100 p-2 flex'> <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={hendelOnChange}required
                                placeholder='enter confirm password'  className='w-full h-full outline-none bg-transparent rounded' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)}>

                                    {
                                        showConfirmPassword ? (<FaEye />) : (<FaEyeSlash />)
                                    }

                                </div>
                            </div>

                        </div>

                        <button className='bg-primary hover:bg-secondary text-white w-full max-w-[200px] rounded-full hover:scale-105 transition-all mx-auto block px-6 py-2 mt-6'>SignUp</button>
                    </form>
                    <p className='my-2 '> Already have account ? <Link to={'/login'} className='hover:underline text-primary'>Login</Link></p>
                </div>
            </div>
        </section>
    )
}

export default SignUp   
