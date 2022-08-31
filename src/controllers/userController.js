const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (abcd, xyz) {
  try {
  let data = abcd.body;
  let savedData = await userModel.create(data);
  console.log(abcd.newAtribute);
  xyz.status(201).send({ msg: savedData });

}
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err})
}

};

const loginUser = async function (req, res) {
  try {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(404).send({
      status: false,
      msg: "username or the password is not corerct",
    });

  
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "plutonium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.status(201).setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });

}
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err})
}

};

const getUserData = async function (req, res) {
 try {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });

}
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err})
}

};

const updateUser = async function (req, res) {
try {
 let userId = req.params.userId;
  
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {userData},{new:true});
  res.status(200).send({ status: updatedUser, data: updatedUser });

}
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err.message})
}

};

const deleteUserKey = async function(req, res) {
  try {
  let userId = req.params.userId
  
  let updatedUser = await userModel.findOneAndUpdate({_id: userId}, {isDeleted: true}, {new: true})
  res.status(200).send({status: true, data: updatedUser})

}
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err.name})
}

}

const postMessage = async function (req, res) {
  try {
    let message = req.body.message
   
    let user = await userModel.findById(req.params.userId)
    
    let updatedPosts = user.posts
    
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})
  return res.status(200).send({status: true, data: updatedUser})

}
catch(err) {
  console.log("this is the error".err)
  res.status(500).send({msg:"server error",error:err})
}
}

// WE WANT TO PRACTICE FOR USE OF
// --------------------------THROW AND FINALLY---------------------------------------------------------------------------

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUserKey = deleteUserKey;
module.exports.postMessage = postMessage
