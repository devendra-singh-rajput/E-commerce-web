const express= require('express')
const router =express.Router()

const signUpController =require("../controllers/user/SignUp")
const signInController = require('../controllers/user/SignIn')
const authToken = require('../middilware/AuthToken')
const userDetailController = require('../controllers/user/UserDetailController')
const userLogout = require('../controllers/user/Logout')
const AllUser = require('../controllers/user/AllUser')
const updateUser = require('../controllers/user/updateUser')


const getProducts = require('../controllers/products/getProducts')
const updateProduct = require('../controllers/products/EditProduct')
const uploadProduct = require('../controllers/products/uploadProduct')
const deleteProduct = require('../controllers/products/deleteProduct')
const productCategory = require('../controllers/products/productCategory')
const productCategoryWise = require('../controllers/products/categoryWiseAllproduct')
const getProductDetailes = require('../controllers/products/getProductDetailes')
const AddToCart = require('../controllers/user/AddToCart')
const cartView = require('../controllers/user/CartView')
const updateCart = require('../controllers/user/updateCart')
const deleteCartProduct = require('../controllers/user/deleteCartProduct')
const searchProducts = require('../controllers/products/searchProducts')
const { getFilteredProducts } = require('../controllers/products/getFilterProducts')
const countProductsInCart = require('../controllers/user/CountProductsCart')
const sendSMS = require('../controllers/order/sendSMS')
const { placeOrder } = require('../controllers/order/OrderCreate')
const { getOrderHistory } = require('../controllers/order/orderHistory')
const { getAllOrders, updateOrder } = require('../controllers/order/getAllOrders')

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
router.put("/updateProducts",authToken,updateProduct)
router.delete("/deleteProduct/:id",authToken,deleteProduct)
router.get("/productCategory",productCategory)
router.post("/productCategoryWise",productCategoryWise)
router.post('/productDetailes',getProductDetailes)
router.get('/search',searchProducts)
router.get('/getFilterProducts',getFilteredProducts)
// prodcut add to cart 
router.post('/addToCart',authToken,AddToCart)
router.get('/countProductCart',authToken,countProductsInCart)
router.get('/cartView',authToken,cartView)
router.post('/updateCart',authToken,updateCart)
router.delete('/deleteCartProduct',authToken,deleteCartProduct)

// products order
router.post("/sendSMS",authToken,sendSMS)
router.post("/placeOrder",authToken,placeOrder)
router.get("/getOrderHistory",authToken,getOrderHistory)
router.get("/getAllOrders",authToken,getAllOrders)
router.put("/updateOrder",authToken,updateOrder)


module.exports=router