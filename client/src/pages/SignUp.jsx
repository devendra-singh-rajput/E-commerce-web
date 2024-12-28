import React, { useContext, useState } from 'react';
import signin from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import summmryApi from '../common/index';
import uploadImages from '../helpers/uploadImage';
import Context from '../context';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [imgLoading, setImgLoading] = useState(false);
    const [data, setData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetail,userAddToCart } = useContext(Context);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleUploadPic = async (e) => {
        const file = [e.target.files[0]]; // Wrap the file in an array
        if (file[0]) { // Check if the file exists
            setImgLoading(true);
            try {
                const profilePicArray= await uploadImages(file); // Upload the image
                const profilePic =profilePicArray[0].url;                
                setData((prev) => ({
                    ...prev,
                    profilePic
                }));
                profilePic&&setImgLoading(false);
            } catch (error) {
                console.error("Error uploading the image:", error);
                toast.error("Failed to upload image. Please try again.");
            }
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password.length < 4) {
            toast.error("Password must be at least 4 characters long.");
            return;
        }
        if (data.password.length > 10) {
            toast.error("Password is so long.");
            return;
        }
        if (data.password === data.confirmPassword) {
            setLoading(true); // Start loading
            try {
                const response = await fetch(summmryApi.signUp.url, {
                    method: summmryApi.signUp.method,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const dataApi = await response.json();
                
                if (dataApi.success) {
                    toast.success(dataApi.message);
                    navigate("/");
                    fetchUserDetail();
                    userAddToCart();
                } else {
                    toast.error(dataApi.message);
                }
                
            } catch (error) {
                console.error("Error during signup:", error);
                toast.error("An error occurred during signup.");
            } finally {
                setLoading(false); // End loading
            }
        } else {
            toast.error("Passwords do not match.");
        }
    };

    return (
        <section id="SignUp">
            <div className='mx-auto container p-4'>
                <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto">
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <img src={data.profilePic || signin} alt="Profile" />
                        <label>
                            <div className='text-xs bg-slate-200 bg-opacity-50 pb-5 cursor-pointer absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type="file" className='hidden' onChange={handleUploadPic} />
                        </label>
                    </div>
                    <form onSubmit={handleSubmit} className='p-5 flex flex-col gap-2'>
                        <div className='grid'>
                            <label>UserName:</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="text"
                                       name="userName"
                                       value={data.userName}
                                       onChange={handleOnChange} required
                                       placeholder='Enter your name' className='w-full h-full outline-none bg-transparent rounded' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email"
                                       name="email"
                                       value={data.email}
                                       onChange={handleOnChange} required
                                       placeholder='Enter email' className='w-full h-full outline-none bg-transparent rounded' />
                            </div>
                        </div>
                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"}
                                       name="password"
                                       value={data.password}
                                       onChange={handleOnChange} required
                                       placeholder='Enter password' className='w-full h-full outline-none bg-transparent rounded' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showConfirmPassword ? "text" : "password"}
                                       name="confirmPassword"
                                       value={data.confirmPassword}
                                       onChange={handleOnChange} required
                                       placeholder='Enter confirm password' className='w-full h-full outline-none bg-transparent rounded' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                        </div>
                        <button className={`bg-primary hover:bg-secondary text-white w-full max-w-[200px] rounded-full hover:scale-105 transition-all mx-auto block px-6 py-2 mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? "Signing Up..." :(imgLoading ? "image uploading..." : "Sign Up")}
                        </button>
                    </form>
                    <p className='my-2'>Already have an account? <Link to={'/login'} className='hover:underline text-primary'>Login</Link></p>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
