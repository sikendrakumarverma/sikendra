const userModel = require("../models/userModels");


// ======================  User Validation  ======================================

const userValidation = async function (req, res, next) {
    try {
        let data = req.body;
        let { title, name, phone, email, password, address } = data;

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Data is mandatory" })

        // ----->> title validation <<-----
        if (!title) { return res.status(400).send({ status: false, msg: "please provide the title" }) }
        if (typeof title === 'string' && title.trim().length === 0) { return res.status(400).send({ status: false, message: "title is empty" }) }
        if (typeof title !== 'string') { return res.status(400).send({ status: false, message: "title should be string" }) }
        
        if (!(/^[a-zA-Z ]{2,30}$/).test(title)) return res.status(400).send({ status: false, msg: " Please enter title as  A-Z or a-z" });

        // ----->> name validation <<-----
        if (!name) { return res.status(400).send({ status: false, message: "Please provide the name" }) }
        if (typeof name === 'string' && name.trim().length === 0) { return res.status(400).send({ status: false, message: "name is empty" }) }
        if (typeof name !== 'string') { return res.status(400).send({ status: false, message: "name should be string" }) }
        if (!(/^[a-zA-Z ]{2,30}$/).test(name)) return res.status(400).send({ status: false, message: " Please enter name as A-Z or a-z" })

        // ----->> phone validation <<-----
        if (!phone) { return res.status(400).send({ status: false, message: "Please provide the phone no." }) }
        if (typeof phone === 'string' && phone.trim().length === 0) { return res.status(400).send({ status: false, message: "phone number is empty" }) }
        if (typeof phone !== 'string') { return res.status(400).send({ status: false, message: "phone number should be string" }) }
        if (!(/^[0]?[123456789]\d{9}$/).test(phone.trim())) { return res.status(400).send({ status: false, message: "Please provide valid phone number" }) }

        // checking phone no. is already there or not
        let phoneNoCheck = await userModel.findOne({ phone: phone })
        if (phoneNoCheck) { return res.status(400).send({ status: false, message: "This phone number is already registerd" }) }

        // ----->> email validation <<-----
        if (!email) { return res.status(400).send({ status: false, message: "Please provide the email" }) }
        if (typeof email === 'string' && email.trim().length === 0) { return res.status(400).send({ status: false, message: "email is empty" }) }
        if (typeof email !== 'string') { return res.status(400).send({ status: false, message: "email should be string" }) }
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email.trim())) { return res.status(400).send({ status: false, message: "Please provide valid email" }) }

        // checking email id is already there or not
        let emailCheck = await userModel.findOne({ email: email })
        if (emailCheck) { return res.status(400).send({ status: false, message: "This email already exists please provide another email" }) }

        // ----->> password validation <<-----
        if (!password) { return res.status(400).send({ status: false, message: "Please provide the password" }) }
        if (typeof password === 'string' && password.trim().length === 0) { return res.status(400).send({ status: false, message: "password is empty" }) }
        if (typeof password !== 'string') { return res.status(400).send({ status: false, message: "password should be string" }) }
        function checkPassword (value) {
            let isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            return isValid.test(value);
        }
        if (!checkPassword(password)) { return res.status(400).send({ status: false, msg: "Minimum 8 characters are required, including ( a-z, A-Z, 0-9, special character- !@#$%^&* )" }) }
        
        // ----->> address validation <<-----
        // if (address === {}) { return res.status(400).send({ status: false, message: "address is empty" }) }
        // console.log('address:', address)
        // let { street, city, pincode} = address;
        
        // if (typeof street === 'string' && street.trim().length === 0) { return res.status(400).send({ status: false, message: "street is empty" }) }
        // if (typeof street !== 'string') { return res.status(400).send({ status: false, message: "street should be string" }) }
        // if (typeof city === 'string' && city.trim().length === 0) { return res.status(400).send({ status: false, message: "city is empty" }) }
        // if (typeof city !== 'string') { return res.status(400).send({ status: false, message: "city should be string" }) }
        // if (typeof pincode === 'string' && pincode.trim().length === 0) { return res.status(400).send({ status: false, message: "pincode is empty" }) }
        // if (typeof pincode !== 'string') { return res.status(400).send({ status: false, message: "pincode should be string" }) }


        next()
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

module.exports = { userValidation };