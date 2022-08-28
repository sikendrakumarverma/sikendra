const { count } = require("console")
const orderModel = require("../models/orderModel")
const userModel= require("../models/userModel")
const productModel= require("../models/productModel")
const moment=require('moment')

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
    //res.send({msg: savedData})
// FOR PURCHASE 
    let HeaderKey=req.headers.isfreeappuser
    if(HeaderKey=='true') {  //means header value is true
        
        let today=moment().format('YYYY.MM.DD');
      req.body["amount"]=0  //amount=0
     req.body["isFreeAppUser"]=HeaderKey
     req.body["date"]=today
     let newDATA= await orderModel.create(data);
     res.send({msg: newDATA})
    }
   else if(HeaderKey=='false') {  //means header value is false
    //   let user= await userModel.findById(userid)
    //   let product= await productModel.findById(productid)
    let productPrice=product.price
    let userBalance=user.balance
    console.log(userBalance,",",productPrice)
   if(userBalance>=productPrice) {
    console.log("Hi you are applicable for making order")
    let userNewBalance=userBalance-productPrice
    let userid=req.body.userid
    let updatedUserBalance= await userModel.findOneAndUpdate({_id: userid},{$set:{balance:userNewBalance}})
    console.log(updatedUserBalance)
    let today=moment().format('YYYY.MM.DD');
    req.body["amount"]= productPrice 
     req.body["isFreeAppUser"]=HeaderKey
     req.body["date"]=today
     let newDATA= await orderModel.create(data);
     res.send({msg: newDATA})
   }
    else{
        return res.send({"msg":"your balance is not sufficiant for this product PLEASE TRY ANOTHER PRODUCT"})
    }
   }

}

module.exports.createOrder = createOrder
// module.exports.getBooksData = getBooksData
// module.exports.updateBooks = updateBooks
// module.exports.deleteBooks = deleteBooks
// module.exports.totalSalesPerAuthor = totalSalesPerAuthor
