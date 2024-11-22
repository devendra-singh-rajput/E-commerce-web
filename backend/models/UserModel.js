const mongoose=require('mongoose')
 
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
     require: true,
  },  
  // cart:{
  //   productId:{
  //     ref:'products',
  //     type:String
  //   },
  //   Quantity:Number
  // },
    email :{
      type:String,
      unique:true
      ,require:true
    },
    password: {
      type: String,
      required: true,
    },
     role: {
      type: String,
      default: 'GENERAL',
    },
    profilePic:String
},{
    timestamps:true
})

const userModel = mongoose.model("user",userSchema)
 
module.exports =userModel