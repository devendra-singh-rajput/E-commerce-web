const userModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');


async function signUpController(req, res) {
  try {
    const {name,email,password}=req.body
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
        password : hashPassword
    }
    
   const userData = new userModel(payload)
    const saveUser=  userData.save()

    res.status(201).json({
        Data:saveUser,
        succsess:true,
        error:false,
        massage:"User created successfully..."
    })

  } catch (error) {
    res.json({
      massage: error,
      error: true,
      success: false,
    });
  }
}
module.exports= signUpController