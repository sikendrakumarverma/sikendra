const jwt = require("jsonwebtoken");
const bookModels = require("../models/bookModels");
const userModels = require("../models/userModels");
const { isValidObjectId, isPresent } = require("./validations");


const authenticate = function (req, res, next) {
  try {
    let token = req.headers[`x-api-key`];
    if (!token) return res.status(400).send({ status: false, message: "Please set token in header" });
    let decodedToken = jwt.verify(token, "Project_3 books-management", { ignoreExpiration: true }, function (error, done) {
      if (error) {
        return res.status(400).send({ status: false, message: "Token is Invalid" });
      }
      return done;
    })

    if (decodedToken.exp < Date.now() / 1000) return res.status(400).send({ status: false, message: "Token is Expired, Please relogin" });

    req.decodedToken = decodedToken.userId
    next()
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }

}

const authorize = async function (req, res, next) {
  try {
    let loggedUserId = req.decodedToken
    let paramBookId = req.params.bookId
    let bodyUserId = req.body.userId

    if (paramBookId) {
      if (!paramBookId) return res.status(400).send({ status: false, message: "Please enter bookId in params" })
      if (!isValidObjectId(paramBookId)) return res.status(400).send({ status: false, message: "bookId is not correct" });
      let checkUser = await bookModels.findById(paramBookId)
      if (!checkUser) return res.status(404).send({ status: false, message: "Book is not found" });
      if (checkUser.userId != loggedUserId) return res.status(400).send({ status: false, message: "Login user is not allowed to change the data of another user" });
    }
    else {
      if (Object.entries(req.body).length == 0) {
        return res.status(400).send({ status: false, message: "Please enter book details" });
      }
      if (!isPresent(bodyUserId)) return res.status(400).send({ status: false, message: "Please enter UserID" })
      if (!isValidObjectId(bodyUserId)) return res.status(400).send({ status: false, message: "UserId is not correct" });
      let checkUser = await userModels.findById(bodyUserId)
      if (!checkUser) return res.status(404).send({ status: false, message: "User is not found" });
      if (checkUser._id != loggedUserId) return res.status(400).send({ status: false, message: "Login user is not allowed to create the data of another user" });
    } 
    next()

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}


module.exports = { authenticate, authorize }