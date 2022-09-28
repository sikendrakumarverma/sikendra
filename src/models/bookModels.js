const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const booksSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        excerpt: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: ObjectId,
            required: true,
            ref: "User"
        },
        ISBN: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        subcategory: {
            type: [String],
            required: true,
            trim: true
        },
        reviews: {
            type: Number,
            default: 0,
        },

        isDeleted: {
            type: Boolean,
            default: false
        },

        deletedAt: {
            type: String,
        },

        releasedAt: {
            type: String,
            required: true
        },
        bookCover:{
            type:String
        }
    },
    { timestamps: true }

)
module.exports = mongoose.model("Book", booksSchema)