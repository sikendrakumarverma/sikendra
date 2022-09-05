const mongoose = require('mongoose');
const validator = require('validator');

const authorSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        enum : ['Mr', 'Mrs', 'Miss']
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password : {
        type : String,
        require : true
    }

}, {timestamps : true});

module.exports = mongoose.model('author',authorSchema);