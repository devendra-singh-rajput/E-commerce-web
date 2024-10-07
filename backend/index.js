const express = require('express');
const cors = require('cors');
const connectDb = require('./config/Db');
const router=require('./routs/index')
const cookieParser = require('cookie-parser')

require('dotenv').config();


const app = express();
app.use(cors({
   origin:process.env.FRONEND_URL,
   credentials:true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)

const PORT = process.env.PORT || 8080; 

connectDb().then(()=>{
   app.listen(PORT, () => {
      console.log("DataBase connected..")
      console.log(`Server started on port ${PORT}...`);
  });
})


