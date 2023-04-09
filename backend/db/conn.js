const db = require("mongoose")

const DataBase = process.env.DB

db.connect(DataBase).then(()=>{
    console.log("Db connected")
}).catch((err)=>{
    console.log("Error=> " + err)
})