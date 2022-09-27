const { isValidObjectId,isValidDate, isPresent, isValidRating, isValidName } = require("../middlewares/validations");
const reviewModels = require("../models/reviewModels")
const bookModels = require("../models/bookModels");

const createReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        const { reviewedBy,reviewedAt, rating, review } = req.body

        if (Object.entries(req.body).length == 0) return res.status(400).send({ status: false, message: "please provide review information" })
        if (!bookId) return res.status(400).send({ status: false, message: "please provide book id in params" })

        let data = {}
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "bookId is not Correct" })
        let availableBook = await bookModels.findOne({ _id: bookId, isDeleted: false })
        if (!availableBook) return res.status(404).send({ status: false, message: "book not found or Deleted" })
        data.bookId = bookId;

        if (!isPresent(review)) return res.status(400).send({ status: false, message: "you missed the review" })
        data.review = review;

        if (!rating) return res.status(400).send({ status: false, message: "please enter rating" })
        if (!isValidRating(rating)) return res.status(400).send({ status: false, message: "Rating should be in between 1-5" })
        data.rating = rating;

        if (reviewedBy) {
            if (!isValidName(reviewedBy)) return res.status(400).send({ status: false, message: "reviewer name should be in alphabets" })
            data.reviewedBy = reviewedBy;
        }
        if (!reviewedBy) data.reviewedBy = 'Guest';

        if (reviewedAt) {
           if (!isValidDate(reviewedAt)) return res.status(400).send({ status: false, message: "Date format should be in (YYYY-MM-DD)" })
            data.reviewedAt = reviewedAt;
        }
        if (!reviewedAt) data.reviewedAt = Date();

        let reviewData = await reviewModels.create(data)
        await bookModels.updateOne({ _id: bookId}, { $inc: { reviews: 1 } })

        return res.status(201).send({ status: true, message: "Success", data: {reviewsData:reviewData} })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const updateReview = async function (req, res) {
    try {
        let reviewId = req.params.reviewId
        let bookId = req.params.bookId

        if (!isPresent(reviewId)) return res.status(400).send({ status: false, message: "please enter review id in params" });
        if (!isPresent(bookId)) return res.status(400).send({ status: false, message: "please enter book id in params" });
        if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: "review id is not correct" });
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "book id is not correct" });

        let checkReview = await reviewModels.findOne({ _id: reviewId, isDeleted: false, bookId })
        if (!checkReview) return res.status(404).send({ status: false, message: "review not found or Deleted" })

        let checkBook = await bookModels.findOne({ _id: bookId, isDeleted: false }).lean().select({__V:0});
        if (!checkBook) return res.status(404).send({ status: false, message: "book not found or Deleted" })

        let { review, rating, reviewedBy } = req.body

        if (Object.entries(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter what you want to update" })
        }
        const data = {};
        if (review) {
            if (!isPresent(review)) return res.status(400).send({ status: false, message: "you missed the review" })
            data.review = review;
        }

        if (rating || rating == 0) {
            if (!isValidRating(rating)) return res.status(400).send({ status: false, message: "Rating should be in between 1-5" })
            data.rating = rating;
        }

        if (reviewedBy) {
            if (!isValidName(reviewedBy)) return res.status(400).send({ status: false, message: "reviewer name should be in alphabets" })
            data.reviewedBy = reviewedBy;
        }
        data.reviewedAt = Date();
        let update = await reviewModels.findOneAndUpdate({ _id: reviewId }, data, { new: true })

        checkBook.reviewsData = update
        return res.status(200).send({ status: true, message: "Success", data: checkBook });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const deleteReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!isPresent(bookId)) return res.status(400).send({ status: false, message: "please provide book id in params" })
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "your bookid is incorrect" })
        let bookData = await bookModels.findOne({ _id: bookId, isDeleted: false })
        if (!bookData) return res.status(404).send({ status: false, message: "book not found or Deleted" })

        if (!isPresent(reviewId)) return res.status(400).send({ status: false, message: "please provide review id in params" })
        if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, msg: "your reviewid is incorrect" })
        let reviewData = await reviewModels.findOne({ _id: reviewId, isDeleted: false })
        if (!reviewData) return res.status(404).send({ status: false, message: "review not found or Deleted" })

        await reviewModels.updateOne({ _id: reviewId }, { $set: { isDeleted: true, deletedAt: Date() } })

        await bookModels.updateOne({ _id: bookId, reviews: { $gt: 0 } }, { $inc: { reviews: -1 } })

        return res.status(200).send({ status: true, message: "review is successfully deleted" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createReview, updateReview, deleteReview }
