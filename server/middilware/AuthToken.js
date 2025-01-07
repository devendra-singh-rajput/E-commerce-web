const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "please login first...",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "User is not logged in",
          error: true,
          success: false,
        });
      }

      req.userId = decoded._id;  // Assign the user ID from the token to req.userId
      next();  // Proceed to the next middleware or route handler
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
