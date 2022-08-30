const jwt = require("jsonwebtoken");

const Authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"]; // Because usergive x-Auth-token in both small or mix letter
  
    //If no token is present in the request header return error
    if (!token) { 
      return res.send({ status: false, msg: "token must be present" });
    }
   console.log(token);
    // If a token is present then decode the token with verify function
    // verify takes two inputs:
    // Input 1 is the token to be decoded
    // Input 2 is the same secret with which the token was generated
    // Check the value of the decoded token yourself
    let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
    if (!decodedToken) {
      return res.send({ status: false, msg: "token is invalid" });
    }
    next()
}

const Authorise = async function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let userId = req.params.userId;
    let user = await userModel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }

  let token = req.headers["x-auth-token"]
  let decodedToken = jwt.verify(token, 'functionup-thorium')
  //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if(userToBeModified != userLoggedIn) {
    return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data'})
  }

    next()
}

module.exports.Authenticate = Authenticate
module.exports.Authorise = Authorise