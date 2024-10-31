const express= require('express')
const router =express.Router()
const signUpController =require("../controllers/SignUp")
const signInController = require('../controllers/SignIn')
const authToken = require('../middilware/AuthToken')
const userDetailController = require('../controllers/UserDetailController')
const userLogout = require('../controllers/Logout')
const AllUser = require('../controllers/AllUser')
const updateUser = require('../controllers/updateUser')
const uploadProduct = require('../controllers/UploadProducts')
const getProducts = require('../controllers/getProducts')
const updateProduct = require('../controllers/updateProduct')

router.post("/signup",signUpController)
router.post("/signin",signInController)
router.get("/user",authToken,userDetailController)
router.get("/userLogout",userLogout)
//admin penal
router.get("/all-user",authToken,AllUser)
router.put("/updateUser",authToken,updateUser)

router.post("/uploadProduct",authToken,uploadProduct)

router.get("/getProducts",getProducts)
router.post("/updateProducts",authToken,updateProduct)

module.exports=router