const jwt = require("jsonwebtoken")




const authenticate = function (req,res) {
    try {
        let token = req.headers[`x-api-key`];

        let decodedToken = jwt.verify(token,"Project_3 books-management",function(error,done){
            if(error){
                return res.status(400).send({status:false, message:"Token is Expired, Please relogin"});
            }
            return done;
        })
        return res.status(200).send({status:false, message:"Success", Data:decodedToken});
    } catch (error) {
        res.send({status:false, message:error.message})
    }

}

module.exports = {authenticate}