const bcrypt =require('bcryptjs');
const userModel = require('../models/UserModel');
const { json } = require('express');
const jwt = require('jsonwebtoken');
async function signInController(req,res){
 try {
    const{email,password}=req.body
    const user = await userModel.findOne({email});
    if(!email&&!password){
      throw new Error("please fill the Email & Password properly!...")
  }
  if(!user){
     throw new Error("user not found")
  }
    const checkPassword = await bcrypt.compare(password,user.password)
   
    if(checkPassword){
       const tokenData={
           _id:user._id
          ,email:user.email
       }
      const token =jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });
       const tokenOption={
         httpOnly:true,
         secure:true
       }
      res.cookie("token",token,tokenOption).status(200).json({
         message:"login successfully!..",
         data:token,
         success:true,
         error:false
      })
   }
   else{
      throw new Error("Invalid password! check your password...")
   }
   

 } catch (error) {
    return res.status(500).json({
        message: error.message ||error,
        error: true,
        success: false,
      });
 }
}
module.exports=signInController