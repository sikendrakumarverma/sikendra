const blogModel = require('../Models/blogModel');

const createBlog = async function(req, res){
    const data = req.body;
    const newBlog = await blogModel.create(data);
    res.status(201).send({status : true, data :newBlog});
}

module.exports.createBlog = createBlog;

// email : manudeep._123@gmail.com
// /^[A-Za-z]{1}[A-Za-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
//test, match method for check 
