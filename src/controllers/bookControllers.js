const bookModels = require("../models/bookModels");
const userModels = require("../models/userModels");
const reviewModels = require("../models/reviewModels")
const { uploadFile } = require("../routes/routeAWS")


const { isPresent, isValidObjectId, isValidISBN, isValidDate } = require("../middlewares/validations");


const createBooks = async function (req, res) {
    try {
        const { title, excerpt, userId, ISBN, category, subcategory, reviews, isDeleted, releasedAt } = req.body;
        const data = {};
        if (!isPresent(title)) return res.status(400).send({ status: false, message: "Please enter Title" })
        let checkTitle = await bookModels.findOne({ title: title })
        if (checkTitle) return res.status(400).send({ status: false, message: "The Same title name book is already present" })
        data.title = title;



        if (!isPresent(excerpt)) return res.status(400).send({ status: false, message: "Please enter Excerpt" })
        data.excerpt = excerpt;

        let id = await userModels.findById(userId).select({ _id: 1 })
        if (!id) return res.status(404).send({ status: false, message: "User not found" })

        data.userId = userId;

        if (!isPresent(ISBN)) return res.status(400).send({ status: false, message: "Please enter ISBN" })
        if (!isValidISBN(ISBN)) return res.status(400).send({ status: false, message: "Please enter Valid ISBN" })
        let isbn = await bookModels.findOne({ ISBN: ISBN });
        if (isbn) return res.status(400).send({ status: false, message: "The ISBN is already Present" })
        data.ISBN = ISBN;

        if (!isPresent(category)) return res.status(400).send({ status: false, message: "Please enter Category" })
        data.category = category;

        if (!isPresent(subcategory)) return res.status(400).send({ status: false, message: "Please enter Subcategory" })
        data.subcategory = subcategory;

        if (reviews) data.reviews = reviews;

        if (isDeleted) data.isDeleted = isDeleted;
        if (isDeleted == true) data.deletedAt = Date()

        if (!isPresent(releasedAt)) return res.status(400).send({ status: false, message: "Please enter release date" })
        if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, message: "Date format should be in (YYYY-MM-DD)" })
        data.releasedAt = releasedAt;


        let files = req.files
        console.log(files)
        if (files && files.length > 0) {

            let uploadedFileURL = await uploadFile(files[0])
            data.bookCover = uploadedFileURL

            let book = await bookModels.create(data)

            return res.status(201).send({ status: true, message: "Book successfully register", data: book })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getBooks = async (req, res) => {
    try {
        let findData = req.query;
        const { userId, category, subcategory } = findData
        if (Object.keys(findData).length === 0) {
            let bookDetails = await bookModels.find({ isDeleted: false }).sort({ title: 1 }).select({ title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 })
            if (bookDetails.length == 0) return res.status(404).send({ status: false, message: "No books found" });
            return res.status(200).send({ status: true, message: "Books list", "no. of books": bookDetails.length, data: bookDetails });
        }

        if (userId || category || subcategory) {
            if (userId) {
                if (!isValidObjectId(findData.userId)) return res.status(400).send({ status: false, message: "UserId is not Correct" });
            }
            findData.isDeleted = false;
            if (category) {
                if (!isPresent(category)) return res.status(400).send({ status: false, message: "Please enter Category" })
                findData.category = category;
            }

            let bookDetails = await bookModels.find(findData).sort({ title: 1 }).select({ title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 })
            if (bookDetails.length == 0) return res.status(404).send({ status: false, message: "No books found" });
            return res.status(200).send({ status: true, message: "Books list", "no. of books": bookDetails.length, data: bookDetails });
        }
        return res.status(400).send({ status: false, message: "Query should be in userId, category and subcategory" });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const getBookById = async function (req, res) {
    try {
        let data = req.params
        let bookId = data.bookId

        if (!data) return res.status(400).send({ status: false, message: "please provide book id in params" })
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "bookId is not correct" });
        const bookData = await bookModels.findOne({ _id: bookId, isDeleted: false }).lean().select({ __v: 0 })
        if (!bookData) return res.status(404).send({ status: false, message: "No data found or deleted" })
        let findData = await reviewModels.find({ bookId: bookData._id, isDeleted: false }).select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })

        bookData.reviewsData = findData

        return res.status(200).send({ status: true, message: "Books list", data: bookData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const updateBook = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        let id = await bookModels.findById(bookId)
        if (!id) return res.status(404).send({ status: false, message: "book not found" })
        if (id.isDeleted == true) return res.status(404).send({ status: false, message: "book is already deleted, you can't update" })

        let { title, excerpt, releasedAt, ISBN } = req.body;
        if (Object.entries(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter what you want to update" })
        }
        const data = {};
        if (title) {
            let checkTitle = await bookModels.findOne({ title: title })
            if (checkTitle) return res.status(400).send({ status: false, message: "The Same title name book is already present" })
            data.title = title;
        }

        if (excerpt) { data.excerpt = excerpt; }

        if (ISBN) {
            if (!isValidISBN(ISBN)) return res.status(400).send({ status: false, message: "Please enter Valid ISBN" })
            let isbn = await bookModels.findOne({ ISBN: ISBN });
            if (isbn) return res.status(400).send({ status: false, message: "The ISBN is already Present" })
            data.ISBN = ISBN;
        }

        if (releasedAt) {
            if (!isValidDate(releasedAt)) return res.status(400).send({ status: false, message: "Date format should be in (YYYY-MM-DD)" })
            data.releasedAt = releasedAt;
        }

        let update = await bookModels.findOneAndUpdate({ _id: bookId }, data, { new: true })
        return res.status(200).send({ status: true, message: "Success", data: update });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!bookId) return res.status(400).send({ status: false, message: "please provide book id in params" })
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "bookId is incorrect" })

        let bookData = await bookModels.findById(bookId)
        if (!bookData) return res.status(404).send({ status: false, message: "No data found" })
        if (bookData.isDeleted == false) {
            await bookModels.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: Date() } }, { new: true })
        } else {
            return res.status(404).send({ status: false, message: "Given Id Book data is already deleted" })
        }
        return res.status(200).send({ status: true, message: " Data is successfully deleted" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createBooks, getBooks, getBookById, updateBook, deleteBookById }