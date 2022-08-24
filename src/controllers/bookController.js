const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body

    //3 a)
    if(!book.authorid) {
        return res.send({status: false, msg: "author id is a mandatory field"})
    }

    //3 b)
    let author = await authorModel.findById(book.authorid)
    if(!author) {
        return res.send({status: false, msg: "Author id is not valid"})
    }

    //3 c)
    if(!book.publisherid) {
        return res.send({status: false, msg: "Publisher id is a mandatory field"})
    }

    // 3 d)
    let publisher = await publisherModel.findById(book.publisherid)
    if(!publisher) {
        return res.send({status: false, msg: "Publisher id is not valid"})
    }

    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}
// 4. all books with booksand pulisher details
const getAllBooksWithCompleteDetails = async function (req, res) {
    // let allBooks = await bookModel.find().populate("authorid").populate("publisherid")
    let allBooks = await bookModel.find().populate('authorid publisherid')
    res.send({data: allBooks})

}

const updateSpecificBooks = async function(req, res) {
    //5(a)
    // get books by the publioshers - Penguin and HarperCollins
    let requiredPublishers = await publisherModel.find({$or: [{name: "Penguin"},{name: "HarperCollins"}]}, {_id: 1})
    //let books = await bookModel.find().populate('publisher')
    //for
    let requiredPublisherIds = [] 
    for (let i = 0; i < requiredPublishers.length; i++) {
        requiredPublisherIds.push(requiredPublishers[i]._id)
    }

    let updatedBooks = await bookModel.updateMany({publisher : {$in: requiredPublisherIds}}, {isHardCover: true}, {new: true})
    res.send({data: updatedBooks})
}
// 5(b)
const updateSpecificRatingsBooks= async function(req, res) {
     let authorRatingsBooks= await bookModel.updateMany({ratings:{$gt:3.5}}, {price:+10},{new: true})
     res.send({data: updateSpecificRatingsBooks })
}

module.exports.createBook= createBook
module.exports.getAllBooksWithCompleteDetails = getAllBooksWithCompleteDetails
module.exports.updateSpecificBooks = updateSpecificBooks
module.exports.updateSpecificRatingsBooks= updateSpecificRatingsBooks