const mongoose=require('mongoose')
 
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
     require: true,
  },  
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
    profilePic:String,
    userDetail:{
      name: { type: String, trim: true },
      pincode: { type: Number, min: 100000, max: 999999 },
      landmark: String,
      address: String,
      city: String,
      state: String,
      phoneNumber: { type: Number, match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] },
      alternatePhoneNumber: { type: Number, match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] },
   }

},{
    timestamps:true
})

const userModel = mongoose.model("user",userSchema)
 
module.exports =userModel