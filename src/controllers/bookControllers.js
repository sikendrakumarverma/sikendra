const { findById, findOne } = require("../models/bookModels");
const bookModels = require("../models/bookModels");
const userModels = require("../models/userModels");
const reviewModels=require("../models/reviewModels")
const { isPresent, isValidObjectId, isValidISBN, isValidDate } = require("../validations/validations");




const createBooks = async function(req,res){
    try {
        const {title,excerpt,userId,ISBN,category,subcategory,reviews,isDeleted,releasedAt} = req.body;
        if(Object.entries(req.body).length == 0){
            return res.status(400).send({status:false,message:"Please enter book details"})
        }
        const data = {};
        if(!isPresent(title)) return res.status(400).send({status:false,message:"Please enter Title"})
        let checkTitle = await bookModels.findOne({title:title})
        if(checkTitle) return res.status(400).send({status:false,message:"The Same title name book is already present"})
        data.title = title;

        if(!isPresent(excerpt)) return res.status(400).send({status:false,message:"Please enter Excerpt"})
        data.excerpt = excerpt;

        if(!isPresent(userId)) return res.status(400).send({status:false,message:"Please enter UserID"})
        if(!isValidObjectId(userId)) return res.status(400).send({status:false,message:"UserId is not Correct"})
        let id = await userModels.findById(userId).select({_id:1})
        if(!id) return res.status(404).send({status:false,message:"User not found"})
        data.userId = userId;

        if(!isPresent(ISBN)) return res.status(400).send({status:false,message:"Please enter ISBN"})
        if(!isValidISBN(ISBN)) return res.status(400).send({status:false,message:"Please enter Valid ISBN"})
        let isbn = await bookModels.findOne({ISBN:ISBN});
        if(isbn) return res.status(400).send({status:false,message:"The ISBN is already Present"})
        data.ISBN = ISBN;
        
        if(!isPresent(category)) return res.status(400).send({status:false,message:"Please enter Category"})
        data.category = category;
        
        if(!isPresent(subcategory)) return res.status(400).send({status:false,message:"Please enter Subcategory"})
        data.subcategory = subcategory;
        
        if(reviews) data.reviews = reviews;

        if(isDeleted) data.isDeleted = isDeleted;
        if(isDeleted==true) data.deletedAt = Date()

        if(!isPresent(releasedAt)) return res.status(400).send({status:false,message:"Please enter release date"})
        if(!isValidDate(releasedAt)) return res.status(400).send({status:false,message:"Date format should be in (YYYY-MM-DD)"})
        data.releasedAt = releasedAt;

        let book = await bookModels.create(data)

        return res.status(201).send({status:true,message:"Success",Data:book})

    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

const getBookById= async function (req, res) {
    try {
        let data = req.params
        let bookId = data.bookId
        if (!data) return res.status(400).send({ status: false, message: "please provide book id in params" })
        let bookData = await bookModels.findOne({ _id: bookId, isDeleted: false })
        if (!bookData) return res.status(404).send({ status: false, message: "No data found" })
        let findData= await reviewModels.find({bookId:bookData._id,isDeleted:false}).select({_id:1,bookId: 1,reviewedBy: 1,reviewedAt:1,rating: 1,review:1})
        let revieData= {_id:bookData._id,title:bookData.title,excerpt:bookData.excerpt,userId:bookData.userId,category:bookData.category,subcategory:bookData.subcategory,isDeleted:bookData.isDeleted,reviews:bookData.reviews,releasedAt:bookData.releasedAt,createdAt:bookData.createdAt,updatedAt:bookData.updatedAt,reviewData:findData}
        
        return res.status(200).send({ status: true, message: "books list", data:revieData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {createBooks,getBookById}