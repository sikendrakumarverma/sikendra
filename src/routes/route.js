const express = require("express")
const router = express.Router()
const url = require("../controller/urlController")

router.post("/test-me", url.createInCachine )
router.get("/get-catchine", url.getCachine )
router.put("/delete",url.deleteCatche)


router.post("/url/shorten", url.createShortUrl)

router.get("/:urlCode", url.getUrl)

// router.all("/**", function(req,res){
//     res.status(400).send("Invlaid endPoint")
// })

module.exports=router