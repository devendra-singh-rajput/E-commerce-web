import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import forgotPasswordImg from '../assest/signin.gif'; // Add an appropriate image
import summmryApi from '../common';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(summmryApi.sendOtp.url, {
                method: summmryApi.sendOtp.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message || "OTP sent to your email!", { autoClose: 1000 });
                setOtpSent(true);
            } else {
                toast.error(result.message || "Failed to send OTP. Try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(summmryApi.verifyOtp.url, {
                method: summmryApi.verifyOtp.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp }),
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message || "OTP verified successfully!", { autoClose: 1000 });
                setOtpVerified(true);
            } else {
                toast.error(result.message || "Invalid OTP. Try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(summmryApi.resetPassword.url, {
                method: summmryApi.resetPassword.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message || "Password reset successfully!", { autoClose: 1000 });
                setEmail("");
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
                setOtpSent(false);
                setOtpVerified(false);
                navigate("/login")
            } else {
                toast.error(result.message || "Failed to reset password. Try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="forgot-password">
            <div className='mx-auto container mb-28 p-4'>
                <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto mt-15">
                    <div className='w-20 h-20 mx-auto overflow-hidden rounded-full'>
                        <img src={forgotPasswordImg} alt="forgot password icon" />
                    </div>
                    <form onSubmit={otpVerified ? handleResetPassword : (otpSent ? handleVerifyOtp : handleSendOtp)} className='p-5 flex flex-col gap-2'>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email"
                                       name="email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       required
                                       placeholder='Enter your registered email'
                                       className='w-full h-full outline-none bg-transparent rounded'
                                       disabled={otpSent || otpVerified} />
                            </div>
                        </div>
                        {otpSent && !otpVerified && (
                            <div className='grid'>
                                <label>OTP:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input type="text"
                                           name="otp"
                                           value={otp}
                                           onChange={(e) => setOtp(e.target.value)}
                                           required
                                           placeholder='Enter the OTP'
                                           className='w-full h-full outline-none bg-transparent rounded' />
                                </div>
                            </div>
                        )}
                        {otpVerified && (
                            <>
                                <div className='grid'>
                                    <label>New Password:</label>
                                    <div className='bg-slate-100 p-2'>
                                        <input type="password"
                                               name="newPassword"
                                               value={newPassword}
                                               onChange={(e) => setNewPassword(e.target.value)}
                                               required
                                               placeholder='Enter new password'
                                               className='w-full h-full outline-none bg-transparent rounded' />
                                    </div>
                                </div>
                                <div className='grid'>
                                    <label>Confirm Password:</label>
                                    <div className='bg-slate-100 p-2'>
                                        <input type="password"
                                               name="confirmPassword"
                                               value={confirmPassword}
                                               onChange={(e) => setConfirmPassword(e.target.value)}
                                               required
                                               placeholder='Confirm new password'
                                               className='w-full h-full outline-none bg-transparent rounded' />
                                    </div>
                                </div>
                            </>
                        )}
                        <button className={`bg-primary hover:bg-secondary text-white w-full max-w-[200px] rounded-full hover:scale-105 transition-all mx-auto block px-6 py-2 mt-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? (otpVerified ? "Resetting..." : (otpSent ? "Verifying..." : "Sending...")) : (otpVerified ? "Reset Password" : (otpSent ? "Verify OTP" : "Send OTP"))}
                        </button>
                    </form>
                    <p className='my-2'>Remembered your password? <Link to={'/login'} className='hover:underline text-primary'>Login</Link></p>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;