const userModel = require("../../models/UserModel");
// const bcrypt = require("bcryptjs");

const EditProfile= async (req, res) => {
  const  userId  = req.userId;
  const { userName, email, password, profilePic, userDetail } = req.body;

  // Create the update payload
  const updateFields = {
    ...(userName && { userName }),
    ...(email && { email }),
    ...(profilePic && { profilePic }),
    ...(userDetail && { userDetail }),
  };

  // If password is provided, hash it
//   if (password) {
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       updateFields.password = hashedPassword;
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Error hashing password.",
//       });
//     }
//   }

  try {
    // Find the user and update their profile
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateFields, {
      new: true, // Return the updated document
    });

    // If user not found, return error
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the profile.",
    });
  }
}

module.exports = EditProfile;
