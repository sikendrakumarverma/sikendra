const mongoose = require('mongoose');
// var validator = require("email-validator");
// validator.validate("test@email.com");

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };


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
        unique : true
    },
    password : {
        type : String,
        require : true
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }

}, {timestamps : true});

module.exports = mongoose.model('author',authorSchema);