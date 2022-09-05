const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
        examples : {
            type : []
        }
    },
    subcategory :{
        type : [],
        examples : {
            type : []
        }
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    isPublished : {
        type : Boolean,
        default : false
    }
}, {timestamp : true});

module.exports = mongoose.model('blog', createBlog);