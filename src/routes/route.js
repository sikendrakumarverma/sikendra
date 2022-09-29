const express = require("express")
const router = express.Router()
const url = require("../controller/urlController")

router.get("/test-me", function(req,res){
    res.send("api running")
})

router.post("/url/shorten", url.createShortUrl)

module.exports=router