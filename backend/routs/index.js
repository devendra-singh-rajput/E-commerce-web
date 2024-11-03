const express= require('express')
const router =express.Router()

const signUpController =require("../controllers/user/SignUp")
const signInController = require('../controllers/user/SignIn')
const authToken = require('../middilware/AuthToken')
const userDetailController = require('../controllers/user/UserDetailController')
const userLogout = require('../controllers/user/Logout')
const AllUser = require('../controllers/user/AllUser')
const updateUser = require('../controllers/user/updateUser')


const uploadProduct = require('../controllers/products/UploadProducts')
const getProducts = require('../controllers/products/getProducts')
const updateProduct = require('../controllers/products/UploadProducts')

router.post("/signup",signUpController)
router.post("/signin",signInController)
router.get("/user",authToken,userDetailController)
router.get("/userLogout",userLogout)
//admin penal
router.get("/all-user",authToken,AllUser)
router.put("/updateUser",authToken,updateUser)
//products
router.post("/uploadProduct",authToken,uploadProduct)
router.get("/getProducts",getProducts)
router.post("/updateProducts",authToken,updateProduct)

module.exports=router