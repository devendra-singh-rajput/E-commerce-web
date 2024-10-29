const uplaodProductPermission = require("../helper/permission");
const productModel = require("../models/ProductModel");

async function uploadProduct(req,res) {
    try {
         const sessionId= req.userId
         if(!uplaodProductPermission(sessionId)){
            throw new Error('permission denied !')
         }
        const uploadProduct= new productModel(req.body)
         const saveProduct =await uploadProduct.save()
        
        res.status(200).json({
            data:saveProduct,
            error:false,
            success:true,
            message:"product uploaded..!"
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          }); 
    }
}
module.exports = uploadProduct