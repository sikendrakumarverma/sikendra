const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/userControllers")
const validation = require("../validations/validations")



router.post("/register", validation.userValidation, userControllers.createUser)

module.exports = router