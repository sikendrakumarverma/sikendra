const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    authorid: {
        type: ObjectId,
        ref: "NewAuthor"
    }, 
    price: Number,
    ratings: Number,
    publisherid: {
        type: ObjectId,
        ref: "NewPublisher"
    },
    isHardCover: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('NewBook', bookSchema)
