const path = require("path")
require('dotenv').config({path: path.resolve(__dirname, "./config.env")})
const express = require("express")
const cors = require("cors");
const app = express()
const { urlencoded } = require("express");
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT;
const route = require("./routes/route")
const db = require("./db/conn")
app.use(cors({
    origin:"*",
    credentials:true,
}));
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(route)

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`Listening to port ${PORT}`)
    }
})