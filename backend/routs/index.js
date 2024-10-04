const express= require('express')
const router =express.Router()
const signUpController =require("../controllers/SignUp")

router.post("/signup",signUpController)


module.exports=router