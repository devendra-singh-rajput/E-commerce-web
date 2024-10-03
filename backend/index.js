const express = require('express');
const cors = require('cors');
const connectDb = require('./config/Db');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080; 

connectDb().then(()=>{
   app.listen(PORT, () => {
      console.log("DataBase connected..")
      console.log(`Server started on port ${PORT}...`);
  });
})


