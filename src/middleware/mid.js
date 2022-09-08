const jwt = require('jsonwebtoken');
const blogModel = require('../Models/blogModel');


const authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key'];
        if (!token) return res.status(400).send("Tokan is Required")
        //___________________________Authintication Check __________________________________________

        let decodedToken = jwt.verify(token, "secretKey")
        console.log(decodedToken)
        req.Tokan = decodedToken
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "token is invalid" });

        //_____________________Authorization Check_____________________________________________________

        // let paramId = req.params.userId
        // let tokenId = decodedToken.userId
        // if (paramId != tokenId)
        //   return res.status(403).send({ status: false, msg: "Authorization failed ' User logged is not allowed to the requested users data" })
        next()
    }
    catch (err) {
        res.status(500).send({ error: err })
    }

}
const Authorise = async function (req, res, next) {
    try {
        // console.log(req.Tokan)
        let id = req.Tokan.id

        let blogId = req.params.blogId;
        let blogId1 = req.query;


        if(blogId){
        let blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(404).send("No such blog exists");
        }

        if (blog.authorId != id) {
            return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data' })
        }
        // next()
      }
      else if(blogId1){
        let blog2 = await blogModel.find(blogId1).select({authorId:1,_id:0});
        console.log(blog2)
         
        if (blog2.length==0) {
            return res.status(404).send("No such blog exists");
        }

        if (element!= id) {
            return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data' })
        }
      }


        //    let blog1 =await blogModel.find(query)
        // 
        next()

    }
    catch (err) {
        console.log("This is the error".err)
        res.status(500).send({ msg: "server error", error: err })
    }

}


module.exports.Authorise = Authorise
module.exports.authentication = authentication