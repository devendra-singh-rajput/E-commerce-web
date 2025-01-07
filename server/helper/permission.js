const userModel = require("../models/UserModel")

const uplaodProductPermission=async(userId)=>{
    const user = await userModel.findById(userId)
    if(user.role==='ADMIN'){
        return true
    }
    return false
}
module.exports=uplaodProductPermission