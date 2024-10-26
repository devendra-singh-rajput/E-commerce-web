const userModel = require("../models/UserModel");

async function updateUser(req,res){
    try {
        const sessonUser=req.userId

       const {userId,email,name,role}=req.body
       const payload={
             ...(email&&{email:email}),
             ...(name&&{name:name}),
             ...(role&&{role:role})
       }

       const User= await userModel.findById(sessonUser)  
        



        const updateUser= await userModel.findByIdAndUpdate(userId,payload)            
        res.status(200).json({
            data:updateUser,
            error:false,
            success:true,
            message:"users updated"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          });
    }
}
module.exports=updateUser