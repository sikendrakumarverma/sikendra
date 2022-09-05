const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weatherController=require("../controllers/weatherController")
const memeController=require("../controllers/memeController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)

router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)

//----------------------THIS API FOR PINCODE-----------------------------------------------------------------
router.get("/cowin/getByPin", CowinController.getByPin)

// -------------THIS API FOR OTP---------------------------------------------------------------------------
router.post("/cowin/getOtp", CowinController.getOtp)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date
router.get("/cowin/getByDistrictId", CowinController.getByDistrictId)

//                    WEATHER API
//router.get("/tempSortedCities",weatherController.getTempSortedCities)

router.get("/tempSortedCitiespqr",weatherController.getsortcity)

//                    MEME API
router.get("/getOwnMeme",memeController.getAllMemes)

router.post("/getOwnMemepqr",memeController.createMeme)

// router.post("/getOwnMemeq",memeController.geMeme)

module.exports = router;