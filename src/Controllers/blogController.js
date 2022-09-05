const authorModel = require('../Models/authorModel');
const blogModel = require('../Models/blogModel');

const createBlog = async function(req, res){
    try{
    const data = req.body;
    let authorId = await authorModel.findById(data.authorId)
    if(!authorId){
        return res.status(400).send('Author Id Invalid')
    }
    const newBlog = await blogModel.create(data);
    res.status(201).send({status : true, data :newBlog})
    }catch(err){ res.status(500).send(err.msg)};
} // post

const getBlog = async function(req, res){
    try{
        // let keys = req.query
        // let authId = keys.author-Id
        // let blogCategory = keys.category
        // let blogSpecifyTag = keys.specify-tag
        // let blogsubCategory = keys.sub-category
        
        

        let fetchBlogs = await blogModel.find({isDeleted : true, isPublished : true});
        let variable = fetchBlogs.length //0
        if(fetchBlogs == variable){ // 0 == 0
            return res.status(404).send({status : false, msg: "Blog is not found" })
        }
        res.status(200).send({status : true,data : fetchBlogs})
    }catch(err){ res.status(500).send(err.msg)}; 
}

module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;


