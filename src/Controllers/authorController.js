const authorModel = require("../Models/authorModel");

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
  if (!data.emailId) {
    return res.status(400).send("Please enter email Id");
  } // email is required if not pass msg
//   .....................................................................

  let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  if (!data.emailId.match(regex)) {
    return res.status(400).send("Email Id is invalid");
  } // if id is not matching with regex

//   .......................................................................

  let isEmail = await authorModel.find({ emailId: data.emailId });
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
}catch(e){
    return res.send({msg : e});
}
}


module.exports.createAuthor = createAuthor;
