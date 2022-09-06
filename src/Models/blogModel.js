const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const date = new Date();

const createBlog = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    authorId : {
        type : ObjectId,
        ref: 'author' 
    },
    tags : {
        type : []
    },
    category : {
        type : String,
        required : true,
    },
    subcategory :{
        type : []
    },
    deletedAt : {
        type : Date,
        default : Date.now
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    publishedAt :{
        type : Date,
        default : Date.now
    },
    isPublished : {
        type : Boolean,
        default : false
    },
}, {timestamp : true});

module.exports = mongoose.model('blog', createBlog);