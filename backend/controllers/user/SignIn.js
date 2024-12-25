const bcrypt = require('bcryptjs');
const userModel = require('../../models/UserModel');
const jwt = require('jsonwebtoken');

async function signInController(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in the email and password properly!",
        error: true,
        success: false,
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        error: true,
        success: false,
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid password! Please check your credentials.",
        error: true,
        success: false,
      });
    }

    // Generate token
    const tokenData = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

    // Configure cookie options
    const isProduction = process.env.NODE_ENV === 'production';
    const tokenOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Lax',
    };

    // Set cookie and send response
    res.cookie("token", token, tokenOptions).status(200).json({
      message: "Login successful!",
      data: { token },
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred during login.",
      error: true,
      success: false,
    });
  }
}

module.exports = signInController;
