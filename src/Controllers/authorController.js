const authorModel = require('../Models/authorModel');

const createAuthor = async function(req, res){
    const data = req.body;
    const newAuthor = await authorModel.create(data);
    res.status(201).send({status : true, data : newAuthor}); 
}; 




module.exports.createAuthor = createAuthor;