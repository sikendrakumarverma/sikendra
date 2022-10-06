const urlModel = require("../models/urlModel")
const shortId = require("shortid")
const validUrl = require("valid-url")
const validator = require("../utiles/validation")
const redis= require("redis")
const {promisify} = require("util")
const { url } = require("inspector")

//connect to redis
const redisClient = redis.createClient( 
    12331,   // port no.
    "redis-12331.c264.ap-south-1-1.ec2.cloud.redislabs.com",    // string like cluster
    { no_ready_check:true }
);
redisClient.auth("ELpMwaUzFAm9aDwvZRAnGDz1G6FPxdWN",function(error){ 
    if (error) throw error;
});
redisClient.on("connect", async function () {
    console.log("connected to redis...")
});
//1. connect to the server
//2. use the command

//command setup for redis

const SET_ASYNC= promisify(redisClient.set).bind(redisClient);
const GET_ASYNC= promisify(redisClient.get).bind(redisClient);
const DEL_ASYNC= promisify(redisClient.del).bind(redisClient);

let createInCachine = async function(req,res){
    try{
    let data= req.body
     let createCachine= await SET_ASYNC("${url}",JSON.stringify(data))
     res.send({data:data})
}
 catch (err){
    console.log(err.message)
}
}
let getCachine= async function(req,res){
    try{
      let catchData= await GET_ASYNC("${url}")
      res.send({data:catchData})
    } catch(err){
        console.log(err)
    }
}
let deleteCatche= async function(req,res){
    try{
      await DEL_ASYNC("${url}")
     res.send({msg:"deleted successfully"})
    } catch(err){
     console.log(err.message)
    }
}

const createShortUrl = async function (req, res) {
    try {
        if (!validator.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "pls provide url" })
        }
        let data={}
        const longUrl = req.body.longUrl

        if (!validator.isValid(longUrl)) {
            return res.status(400).send({ status: false, message: "longUrl is mandatory" })
        }

        // validating longurl
        if (!validator.validateUrl(longUrl)) {
            return res.status(400).send({ status: false, message: "Invalid longUrl" })
        }
        data.longUrl=longUrl

        // generating shortUrl
        const urlCode = shortId.generate(longUrl)
        
        const shortUrl = `http://localhost:3000/${urlCode}`
        data.shortUrl=shortUrl
        data.urlCode=urlCode

        // check for already present short url
        const existedUrl = await urlModel.findOne({ longUrl }).lean().select({_id:0 , __v:0})
        if (existedUrl) {
            return res.status(200).send({ status: true, message: "already shorted", data: existedUrl })
        }

        // creating short url
        const newShortUrl = await urlModel.create( data)

        return res.status(201).send({ status: true,message:"shorten url successfully created" ,data: data })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getUrl = async function (req, res) {
    try {
        const urlCode = req.params.urlCode
        let profile = await GET_ASYNC("${urlData}")
        if(profile){
           return res.status(302).send({"Found2 Redirecting to":profile})
        }                                                                

        const shortUrl = await urlModel.findOne({ urlCode }) 
        if (!shortUrl) {
            return res.status(404).send({ status: false, message: "no shortUrl found" })
        }
        
       let url= shortUrl.longUrl
        await SET_ASYNC("${urlData}",JSON.stringify(url))
     
        

        return res.status(302).send(`Found Redirecting to ${shortUrl.longUrl}`)
    }
    catch(err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {createShortUrl,getUrl,createInCachine,getCachine,deleteCatche}