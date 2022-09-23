const { isValidObjectId, isPresent, isValidRating, isValidName } = require("../middlewares/validations");
const reviewModels = require("../models/reviewModels")

const createReview = async function (req, res) {
    try {

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const updateReview = async function (req, res) {
    try {
        let reviewId = req.params.reviewId
        let bookId = req.params.bookId

        if (!isPresent(reviewId)) return res.status(500).send({ status: false, message: "please enter review id in params" });
        if (!isPresent(bookId)) return res.status(500).send({ status: false, message: "please enter book id in params" });
        if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: "review id is not correct" });
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "book id is not correct" });

        let checkReview = await reviewModels.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReview) return res.status(404).send({ status: false, message: "review not found or Deleted" })

        let checkBook = await bookModels.findOne({ _id: bookId, isDeleted: false })
        if (!checkBook) return res.status(404).send({ status: false, message: "book not found or Deleted" })

        if (bookId != checkReview.bookId) return res.status(404).send({ status: false, message: "your given review id is not matched with your given book id" })

        let { review, rating, reviewedBy } = req.body

        if (Object.entries(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please enter what you want to update" })
        }
        const data = {};
        if (review) {
            if (!isPresent(review)) return res.status(400).send({ status: false, message: "you missed the review" })
            data.review = review;
        }

        if (rating) {
            if (!isValidRating(rating)) return res.status(400).send({ status: false, message: "Rating should be in between 1-5" })
            data.rating = rating;
        }

        if (reviewedBy) {
            if (!isValidName(reviewedBy)) return res.status(400).send({ status: false, message: "reviewer name should be in alphabets" })
            data.reviewedBy = reviewedBy;
        }

        let update = await reviewModels.findOneAndUpdate({ reviewId }, data, { new: true })
        let incReviewCount = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: 1 } }, { new: true }).lean().select({ __V: 0 })

        incReviewCount.reviewsData = update
        return res.status(200).send({ status: true, message: "Success", data: incReviewCount });

    } catch (error) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const deleteReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        if (!isPresent(bookId)) return res.status(400).send({ status: false, message: "please provide book id in params" })
        if (!isValidreviewId(bookId)) return res.status(400).send({ status: false, msg: "your bookid is incorrect" })
        let bookData = await bookModels.findOne({_id:reviewId,isDeleted:false})
        if (!bookData) return res.status(404).send({ status: false, message: "book not found or Deleted" })

        if (!isPresent(reviewId)) return res.status(400).send({ status: false, message: "please provide review id in params" })
        if (!isValidreviewId(reviewId)) return res.status(400).send({ status: false, msg: "your reviewid is incorrect" })
        let reviewData = await reviewModels.findOne({_id:reviewId,isDeleted:false})
        if (!reviewData) return res.status(404).send({ status: false, message: "review not found or Deleted" })
            
        if (bookId != reviewData.bookId) return res.status(404).send({ status: false, message: "your given review id is not matched with your given book id" })

        await reviewModels.updateOne({ _id: reviewId }, { $set: { isDeleted: true, deletedAt: Date() } })
        
        await bookModel.updateOne({ _id: bookId, reviews: { $gt: 0 } }, { $inc: { reviews: -1 } })

        return res.status(200).send({ status: true, message: "review is successfully deleted" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createReview, updateReview ,deleteReview}
