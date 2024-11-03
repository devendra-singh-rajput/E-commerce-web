const express = require('express');
const cors = require('cors');
const connectDb = require('./config/Db');
const router=require('./routs/index')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const url=process.env.FRONEND_URL|| process.env.FRONEND_URL_LOCAL
const app = express();
app.use(cors({
   origin:url,
   credentials:true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)

const PORT = process.env.PORT || 8080; 
// 0,0,0,0 add for host at loact network
connectDb().then(()=>{
   app.listen(PORT,'0.0.0.0', () => {
      console.log("DataBase connected..")
      console.log(`Server started on port ${PORT}...`);
  });
})


