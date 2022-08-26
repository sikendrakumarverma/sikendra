const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")
const ProductController=require("../controllers/productController")
const OrderController= require("../controllers/orderController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser",commonMW.mid1, UserController.createUser)

router.post("/createProduct", ProductController.createProduct )

router.post("/createOrder",commonMW.mid1,OrderController .createOrder  )

//router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, UserController.basicCode)


module.exports = router;