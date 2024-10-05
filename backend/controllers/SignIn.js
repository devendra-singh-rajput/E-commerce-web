const bcrypt =require('bcryptjs');
const userModel = require('../models/UserModel');
const { json } = require('express');
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
    const checkPassword =bcrypt.compare(password,user.password)
    console.log("check password",checkPassword)
   

 } catch (error) {
    return res.status(500).json({
        message: error.message ||error,
        error: true,
        success: false,
      });
 }
}
module.exports=signInController