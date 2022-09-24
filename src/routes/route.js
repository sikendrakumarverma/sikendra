const express = require("express");
const router = express.Router();

const { createUsers, login } = require("../controllers/userControllers");
const { createBooks, getBooks, getBookById, updateBook, deleteBookById } = require("../controllers/bookControllers");
const { authenticate, authorize } = require("../middlewares/auth");
const { createReview, updateReview, deleteReview } = require("../controllers/reviewControllers");


//---------User Api's----------//
router.post("/register", createUsers);
router.post("/login", login)

//-----------Book Api's----------//
router.post("/books", authenticate, createBooks)
router.get("/books", authenticate, getBooks)
router.get("/books/:bookId", authenticate, authorize, getBookById)
router.put("/books/:bookId", authenticate, authorize, updateBook)
router.delete("/books/:bookId", authenticate, authorize, deleteBookById)

//------------review Api's----------//
router.post("/books/:bookId/review",  createReview)
router.put("/books/:bookId/review/:reviewId",  updateReview)
router.delete("/books/:bookId/review/:reviewId",  deleteReview)
router.get("/auth", authenticate)



module.exports = router