const userModel = require('../../models/UserModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const dotenv=require('dotenv')
dotenv.config();
// In-memory OTP store (for development)
const otpStore = new Map();

// Validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error with provided credentials:", error);
    } 
});


// Send OTP
const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Valid email is required.' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        const otp = crypto.randomInt(100000, 999999);
        otpStore.set(email, otp);

        // Send OTP email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
        });

        // Set OTP expiration
        setTimeout(() => otpStore.delete(email), 10 * 60 * 1000);

        res.status(200).json({ success: true, message: 'OTP sent to your email.' });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    }
};

// Verify OTP
const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    const storedOtp = otpStore.get(email);
    if (!storedOtp) return res.status(400).json({ success: false, message: 'OTP expired or not found.' });

    if (parseInt(otp) !== storedOtp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }

    otpStore.delete(email);
    res.status(200).json({ success: true, message: 'OTP verified successfully.' });
};

// Reset Password
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email and new password are required.' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: 'Failed to reset password.' });
    }
};

module.exports = { sendOtp, verifyOtp, resetPassword };
