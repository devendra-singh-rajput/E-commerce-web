import React, { useContext, useState } from 'react';
import signin from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summmryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    
    const navigate = useNavigate();
    const { fetchUserDetail,userAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const dataResponse = await fetch(summmryApi.signIn.url, {
                method: summmryApi.signIn.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            const dataApi = await dataResponse.json();
            if (dataApi.success) {
                toast.success(dataApi.message,{autoClose: 1000});
                navigate("/");
                fetchUserDetail();
                userAddToCart()
            } else {
                toast.error(dataApi.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <section id="login">
            <div className='mx-auto container mb-28 p-4'>
                <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto mt-15">
                    <div className='w-20 h-20 mx-auto overflow-hidden rounded-full'>
                        <img src={signin} alt="signin icon" />
                    </div>
                    <form onSubmit={handleSubmit} className='p-5 flex flex-col gap-2'>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email"
                                       name="email"
                                       value={data.email}
                                       onChange={handleOnChange}
                                       required
                                       placeholder='Enter email'
                                       className='w-full h-full outline-none bg-transparent rounded' />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"}
                                       name="password"
                                       value={data.password}
                                       onChange={handleOnChange}
                                       required
                                       placeholder='Enter password'
                                       className='w-full h-full outline-none bg-transparent rounded' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-primary'>Forgot password</Link>
                        </div>
                        <button className={`bg-primary hover:bg-secondary text-white w-full max-w-[200px] rounded-full hover:scale-105 transition-all mx-auto block px-6 py-2 mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className='my-2'>Don't have an account? <Link to={'/sign-up'} className='hover:underline text-primary'>Sign up</Link></p>
                </div>
            </div>
        </section>
    );
}

export default Login;
