const jwt = require("jsonwebtoken");

const mid1 = async function (req, res) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    if(!userId) {
        return res.send({ status: false, msg: "user id  must be present PLEASE ENTER IN THE URL" });
   }
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
   return res.send({ status: false, msg: "No such user exists" });
   next()
}

module.exports.mid1= mid1