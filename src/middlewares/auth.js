const jwt = require("jsonwebtoken");
const bookModels = require("../models/bookModels");
const { isValidObjectId } = require("./validations");


const authenticate = function (req, res, next) {
  try {
    let token = req.headers[`x-api-key`];
    if (!token) return res.status(400).send({ status: false, message: "Please set token in header" });
    let decodedToken = jwt.verify(token, "Project_3 books-management", function (error, done) {
      if (error) {
        return res.status(400).send({ status: false, message: "Token is Expired, Please relogin or may be token is not valid" });
      }
      return done;
    })
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

    if (!isValidObjectId(paramBookId)) return res.status(400).send({ status: false, message: "bookId is not correct" });
    let checkUser = await bookModels.findById(paramBookId)
    if (!checkUser) return res.status(400).send({ status: false, message: "Book is not found" });
    if (checkUser.userId != loggedUserId) return res.status(400).send({ status: false, message: "Login user is not allowed to change the data of another user" });
    next()
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}


module.exports = { authenticate, authorize }