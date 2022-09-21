const userModel = require("../models/userModels")
const { isPresent, isValidEmail, isValidPassword } = require("../validations/validations")
const jwt = require('jsonwebtoken');

const createUsers = async function(req,res){
    let data = req.body;
    let user = await userModel.create(data)
    res.send(user);
}
const login = async function (req, res) {
    try {
        let { email, password } = req.body;
        if (Object.entries(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter email and Password" })
        }
        if (!isPresent(email)) {
            return res.status(400).send({ status: false, message: "Please enter email" })
        }
        if (!isPresent(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }
        if (isValidEmail(email)==false) {
            return res.status(400).send({ status: false, message: "Please enter correct Email" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Please enter correct Password" })
        }
        let user = await userModel.findOne(req.body);
        if (!user) {
            return res.status(400).send({ status: false, message: "User not found" })
        }
        let token = jwt.sign({ email: user.email, password: user.password, userId: user["_id"]}, "Project_3 books-management",{expiresIn:"10m"})
        return res.status(400).send({ status: true, message: "Success", Data: { token: token } })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = {createUsers,login}