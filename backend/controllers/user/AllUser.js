const userModel = require("../../models/UserModel");

async function AllUser(req,res){
    try {
        const users= await userModel.find()            
        res.status(200).json({
            data:users,
            error:false,
            success:true,
            message:"users detail"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          }); 
    }
}
module.exports=AllUser