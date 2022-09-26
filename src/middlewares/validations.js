const mongoose = require("mongoose")

const isPresent = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    return nameRegex.test(name)
}

const isValidTitle = function (title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
}

const isValidPhone = function (phone) {
    var re = /^((\+91)?|91)?[6-9][0-9]{9}$/;
    return re.test(phone);
}

const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}

const isValidPassword = function (password) {
    var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})");
    return passRegex.test(password)
}

const isValidObjectId = function (id) {
    var ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id)
}

const isValidISBN = function (ISBN) {
    const isbnRegex = /^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/
    return isbnRegex.test(ISBN)
}

const isValidDate = function (date) {
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return dateRegex.test(date)
}

const isValidRating = function isInteger(value) {
    if (value % 1 == 0 && value>=1 && value<=5) return true;
    return false;
}



module.exports = {
    isValidName,
    isValidTitle,
    isValidPhone,
    isValidISBN,
    isValidEmail,
    isValidPassword,
    isValidObjectId,
    isPresent,
    isValidDate,
    isValidRating,
}