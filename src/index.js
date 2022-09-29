const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")

app.use(express.json())

mongoose.connect(
    "mongodb+srv://anil1happy:cf0YpWdEz1BzTFdf@cluster0.dkcg6jz.mongodb.net/group57Database",
    {useNewUrlParser:true}
).then(()=>console.log("mongoDb is connected"))
    .catch((err)=>console.log(err))

app.use("/",route)

app.listen(3000 , function(){
    console.log("Express is running on port 3000")
})