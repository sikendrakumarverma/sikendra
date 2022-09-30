const urlModel = require("../models/urlModel")
const shortId = require("shortid")
const validUrl = require("valid-url")
const validator = require("../utiles/validation")

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

        const shortUrl = await urlModel.findOne({ urlCode }) 
        if (!shortUrl) {
            return res.status(404).send({ status: false, message: "no shortUrl found" })
        }

        return res.status(302).send(`Found. Redirecting to ${shortUrl.longUrl}`)
    }
    catch {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {createShortUrl,getUrl}