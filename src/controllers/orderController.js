const { count } = require("console")
const orderModel = require("../models/orderModel")

const createOrder= async function (req, res) {

    let data= req.body
    let tokenDataInHeaders= req.headers.token
    //Get all headers from request
    console.log("Request headers before modificatiom",req.headers)
    //Get a header from request
    console.log(req.headers.batch)
    console.log(req.headers["content-type"])
    console.log(tokenDataInHeaders)
    //Set a header in request
    req.headers['month']='July' //req.headers.month = "July"

    //Set an attribute in request object
    req.anything = "everything"
    
    
    console.log("Request headers after modificatiom",req.headers)
    
    //Set a header in response
    res.header('year','2022')
    //res.send({msg: "data"})
             //END OF HEADERS VALIDATION, BODY VALIDATION

    //FOR USERID PRESENT OR NOT IF PRESENT, VALID OR NOT
    
    if(!data.userid) {
        return res.send({status: false, msg: "user id is a mandatory field"})
    }

    let user = await userModel.findById(data.userid)
    if(!user) {
        return res.send({status: false, msg: "User id is not valid"})
    }
   //FOR PRODUCTID PRESENT OR NOT IF PRESENT, VALID OR NOT
    if(!data.productid) {
        return res.send({status: false, msg: "product id is a mandatory field"})
    }
   
    let product = await productModel.findById(data.productid)
    if(!product) {
        return res.send({status: false, msg: "product id is not valid"})
    }
    let savedData= await orderModel.create(data)
    res.send({msg: savedData})
}

module.exports.createOrder = createOrder
module.exports.getBooksData = getBooksData
module.exports.updateBooks = updateBooks
module.exports.deleteBooks = deleteBooks
module.exports.totalSalesPerAuthor = totalSalesPerAuthor
