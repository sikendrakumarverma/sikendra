const authorModel = require("../Models/authorModel");
const jwt=require('jsonwebtoken')

const createAuthor = async function (req, res) {
try{
  const data = req.body;
  if (!data.fname) {
    return res.status(400).send("Please enter first name");
  }
//   ........................................................
  if (!data.lname) {
    return res.status(400).send("Please enter last name");
  }
//   ...............................................................
  if (!data.title) {
    return res.status(400).send("Please enter the title");
  }
//   ..................................................................

// ************************* email validation(start) **************************************
  if (!data.email) {
    return res.status(400).send("Please enter email Id");
  } // email is required if not pass msg
//   .....................................................................

  let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  if (!data.email.match(regex)) {
    return res.status(400).send("Email Id is invalid");
  } // if id is not matching with regex

//   .......................................................................

  let isEmail = await authorModel.find({ email: data.email });
  if (isEmail) {
    return res.status(400).send("This email Id is already exists");
  } // if id is already present

//   *************************** email validation (end) *****************************
//   ..........................................................................
if (!data.password) {
    return res.status(400).send("Please enter password");
  }

  const newAuthor = await authorModel.create(data);
  res.status(201).send({ status: true, data: newAuthor })
}catch(err){
    return res.status(500).send({msg : err});
}
}

const authorLogin = async function (req, res) {
  let data = req.body;
  let userName = data.email;
  let password = data.password;
  let login = await authorModel.findOne({email : userName, password : password}).select({_id : 1})
  if(!login){
    return res.status(400).send({status : false, msg : 'Please enter valid email or password'})
  }
  let token = jwt.sign({
    id : login._id.toString(), 
    project: 'project-1'}, 
        "secretKey"
    )
  res.setHeader("x-api-key", token)
  res.status(201).send({status : true, data : token}) 
};


module.exports.createAuthor = createAuthor;
module.exports.authorLogin = authorLogin;
