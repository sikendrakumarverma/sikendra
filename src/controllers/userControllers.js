const userModel = require("../models/userModels")
const { isPresent, isValidEmail, isValidPassword, isValidName, isValidPhone, isValidTitle } = require("../middlewares/validations")
const jwt = require('jsonwebtoken');

const createUsers = async function (req, res) {
    try {
        let data = req.body;
        let { title, name, phone, email, password, address } = data;

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Data is mandatory" })

        // ----->> title validation <<-----
        if (!isPresent(title)) { return res.status(400).send({ status: false, msg: "please provide the title" }) }
        if (!isValidTitle(title)) { return res.status(400).send({ status: false, message: "title should be Mr, Mrs, Miss" }) }
        data.title = title

        // ----->> name validation <<-----

        if (!isPresent(name)) return res.status(400).send({ status: false, message: "Please enter name" })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: "Name should be in alphabets" })
        data.name = name;

        // ----->> phone validation <<-----
        if (!isPresent(phone)) { return res.status(400).send({ status: false, message: "Please provide the phone no." }) }
        if (!isValidPhone(phone)) { return res.status(400).send({ status: false, message: "Please provide valid phone number" }) }
        let phoneNoCheck = await userModel.findOne({ phone: phone })
        if (phoneNoCheck) { return res.status(400).send({ status: false, message: "This phone number is already registerd" }) }
        data.phone = phone;

        // ----->> email validation <<-----
        if (!isPresent(email)) { return res.status(400).send({ status: false, message: "Please provide the email" }) }
        if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Please provide valid email number" }) }
        let emailCheck = await userModel.findOne({ email: email })
        if (emailCheck) { return res.status(400).send({ status: false, message: "This email is already registerd" }) }
        data.email = email;

        // ----->> password validation <<-----
        if (!isPresent(password)) { return res.status(400).send({ status: false, message: "Please provide the password" }) }
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Password must have Upper Case, Lower Case, Numbers, special characters" }) }
        data.password = password;

        // ----->> address validation <<-----
        if (address) {
            if (address.pincode) {
                if (! /^\+?([1-9]{1})\)?([0-9]{5})$/.test(address.pincode)) {
                    return res.status(400).send({ status: false, message: "invalid pincode" })
                }
            }
        }
        data.address = address;

        const createdData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "success", data: createdData })

    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
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
        if (isValidEmail(email) == false) {
            return res.status(400).send({ status: false, message: "Please enter correct Email" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Please enter correct Password" })
        }
        let user = await userModel.findOne(req.body);
        if (!user) {
            return res.status(400).send({ status: false, message: "User not found" })
        }
        let token = jwt.sign({ userId: user["_id"] }, "Project_3 books-management", { expiresIn: "10m" })
        return res.status(200).send({ status: true, message: "Success", data: { token: token } })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createUsers, login }
