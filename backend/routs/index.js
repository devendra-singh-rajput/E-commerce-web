const express= require('express')
const router =express.Router()
const signUpController =require("../controllers/SignUp")
const signInController = require('../controllers/SignIn')
const authToken = require('../middilware/AuthToken')
const userDetailController = require('../controllers/UserDetailController')
const userLogout = require('../controllers/Logout')
const AllUser = require('../controllers/AllUser')
const updateUser = require('../controllers/updateUser')

router.post("/signup",signUpController)
router.post("/signin",signInController)
router.get("/user",authToken,userDetailController)
router.get("/userLogout",userLogout)

router.get("/all-user",authToken,AllUser)
router.post("/updateUser",authToken,updateUser)
module.exports=router