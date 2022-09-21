const mongoose = require("mongoose")
const ID = mongoose.Schema.Types.ObjectId
const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        ref: "book",
        required: true
    },
    reviewedBy: {
        type: String,
        required: true,
        default: 'Guest'
    },
    reviewedAt: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        minlength: 1,
        maxlength: 5,
        required: true
    },
    review: {
        type: String,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    }
},{timestamps:true})

module.exports = mongoose.model("review", reviewSchema)