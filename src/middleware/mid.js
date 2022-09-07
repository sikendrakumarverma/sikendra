const jwt = require('jsonwebtoken')


const authentication = async function (req, res, next) {
   try{
    let tokan = req.headers['x-api-key'];
    if (!tokan) return res.status(400).send("Tokan is Required")
    //___________________________Authintication Check __________________________________________

    let decodedToken = jwt.verify(tokan, "secretkey")
    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" });

//_____________________Authorization Check_____________________________________________________

    // let paramId = req.params.userId
    // let tokenId = decodedToken.userId
    // if (paramId != tokenId)
    //   return res.status(403).send({ status: false, msg: "Authorization failed ' User logged is not allowed to the requested users data" })
    next()
   }
   catch(err){
       res.status(500).send({error:err})
   }
   
}

module.exports.authentication = authentication