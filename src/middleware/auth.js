const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const Authenticate = function (req, res, next) {
  try {
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send({ status: false, msg: "token must be present" });
  }
  console.log(token);

  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken) {
    return res.status(403).send({ status: false, msg: "token is invalid" });
  }
  next()
  }
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err})
}

}

const Authorise = async function (req, res, next) {
try {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).send("No such user exists");
  }

  let token = req.headers["x-auth-token"]
  let decodedToken = jwt.verify(token, 'functionup-thorium')

  let userToBeModified = req.params.userId

  let userLoggedIn = decodedToken.userId
  
  if (userToBeModified != userLoggedIn) {
    return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data' })
  }
 next()

}
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err})
}

}

module.exports.Authenticate = Authenticate
module.exports.Authorise = Authorise