const express= require('express')
const router =express.Router()
const signUpController =require("../controllers/SignUp")
const signInController = require('../controllers/SignIn')

router.post("/signup",signUpController)
router.post("/signin",signInController)


module.exports=router