const jwt = require('jsonwebtoken');
const blogModel = require('../Models/blogModel');


const authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key'];
        if (!token) return res.status(400).send("Tokan is Required")
        
        let tokenRegex=/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
        if(!token.match(tokenRegex)) return res.status(400).send({status:false,msg:"In Valide Token"})

        //___________________________Authintication Check __________________________________________

        let decodedToken = jwt.verify(token, "secretKey")
        console.log(decodedToken)

        req.Tokan = decodedToken
        // if (!decodedToken)
        //     return res.status(401).send({ status: false, msg: "token is invalid" })
        next()
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }

}
//_______________Authorisation 1 ___________________________________________________________________________

const Authorise = async function (req, res, next) {
    try {
        // console.log(req.Tokan)
        let id = req.Tokan.id

        let blogId = req.params.blogId

        let idRegex = /^[a-f\d]{24}$/i
        if (!blogId.match(idRegex)) return res.status(400).send({ status: false, msg: "Param Id(ObjectId) Must be 24 byte" })

        let authorIdQue = req.query.authorId;
        //__________________Param Request Part____________________________________________________________

        if (blogId) {
            let blog = await blogModel.find({ _id: blogId }).select({ authorId: 1, });
            let author = blog[0].authorId
            let id1 = author.toString()
            console.log(id1)
            console.log(author)
            if (blog.length == 0) {
                return res.status(404).send("No such blog exists");
            }
            if (id1 != id) {
                return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data' })
            }
            next()
        }
        //_________________________Qurery Request___________________________________________________________________________
        if (authorIdQue) {
            if (authorIdQue != id) {
                return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data' })
            }
            next()
        }
    }
    catch (err) {
        console.log("This is the error", err.message)
        res.status(500).send({ msg: "server error", error: err })
    }

}

const deleteByQuery = async function (req, res, next) {
    try {
        let tokenAuthorId = req.Tokan.id
        let data = req.query

        let { authorId, tags, category, subcategory, published } = data
//___________________________________________________________________________________________________________________________

        if (!authorId) return res.status(400).send({ status: false, msg: "User 'Request' failed (authorId Must) " })

        let idRegex = /^[a-f\d]{24}$/i
        if (!authorId.match(idRegex)) return res.status(400).send({ status: false, msg: "authorId (ObjectId) Must be 24 byte" })


        let obj = { authorId: tokenAuthorId }//Author Id In Token
        if (authorId) {
            if (authorId != obj.authorId) {
                return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data because it is another user data' })
            }
        }
//________________________________________________________________________________________________________________________________________

        if (category) { obj.category = req.query.category }

        if (tags) {const tagsArr = tags.trim().split(" ").map(tag => tag.trim());
            obj.tags = { $all: tagsArr }}

        if (subcategory) { obj.subcategory = req.query.subcategory }
        if (published) { obj.published = req.query.published }

        let result = await blogModel.find({ $and: [obj, { deleted: false }] })

        if (result.length == 0)
            return res.status(404).send({ status: false, msg: "NO DATA FOUND" })

        req.obj = obj
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports.Authorise = Authorise
module.exports.authentication = authentication
module.exports.deleteByQuery = deleteByQuery