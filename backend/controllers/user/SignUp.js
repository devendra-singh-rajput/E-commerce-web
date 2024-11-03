const userModel = require("../../models/UserModel");
const bcrypt = require('bcryptjs');


async function signUpController(req, res) {
  const {name,email,password}=req.body
  const user = await userModel.findOne({email});
  if(user){
   return res.status(400).send({
     success:false,
     message:"User Already exist.."

   })
  }


  try {
    if(!email&&!password&&!name){
        throw new Error("please fill the detail properly!...")
    } 
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if(!hashPassword){
        throw new Error("hash password error!...")
    }
    const payload={
        ...req.body,
        role:"GENERAL",
        password : hashPassword
    }
    const userData = new userModel(payload)
    const saveUser= await userData.save()
    res.status(201).json({
        Data:saveUser,
        success:true,
        error:false,
        message:"User created successfully..."
    })

  } catch (error) {
     return res.status(500).json({
      message: error.message ||error,
      error: true,
      success: false,
    });
  }
}
module.exports= signUpController