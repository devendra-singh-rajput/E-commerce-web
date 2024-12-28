const userModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Make sure JWT is imported

async function signUpController(req, res) {
  const { userName, email, password } = req.body;

  try {
    // Validate input
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Create new user payload
    const payload = {
      ...req.body,
        role:"GENERAL",
        password : hashPassword
    };

    // Save new user
    const newUser = new userModel(payload);
    const savedUser = await newUser.save();

    // Generate token
    const tokenData = { _id: savedUser._id, email: savedUser.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "8h", // Token expires in 8 hours
    });

    // Configure cookie options
    const isProduction = process.env.NODE_ENV === "production";
    const tokenOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    };

    // Set cookie and send response
    res.cookie("token", token, tokenOptions).status(200).json({
      success: true,
      message: "User created successfully!",
      data: {
        token,
        user: {
          _id: savedUser._id,
          name: savedUser.userName,
          email: savedUser.email,
          role: savedUser.role,
        },
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
}

module.exports = signUpController;
