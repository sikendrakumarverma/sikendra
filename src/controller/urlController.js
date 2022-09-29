const urlModel = require("../models/urlModel")
const shortId = require("shortid")
const validUrl = require("valid-url")

const createShortUrl = async function(req,res){
    try{
        if(req.body.length==0){
            return res.status(400).send({status:true, message:"pls provide url"})

        }
        const longUrl = req.body.longUrl
        const urlCode = shortId.generate(longUrl)
        const shortUrl = `http://localhost:3000/${urlCode}`

        const newShortUrl = await urlModel.create({longUrl,urlCode,shortUrl})
        
        return res.status(201).send({status:true, data:newShortUrl})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

module.exports={
    createShortUrl
}