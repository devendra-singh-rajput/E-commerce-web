const userModel = require("../models/UserModel");

async function userDetailController(req,res){
    try {
        const user= await userModel.findById(req.userId)            
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user detail"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          });
    }
}
module.exports=userDetailController