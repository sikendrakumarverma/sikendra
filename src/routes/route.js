const express = require("express");
const router = express.Router();

const { createUsers, login } = require("../controllers/userControllers");
const { createBooks, getBooks,getBookById, updateBook,deleteBookById } = require("../controllers/bookControllers");
const { authenticate, authorize } = require("../middlewares/auth");

router.post("/register",createUsers);
router.post("/login",login)
router.post("/books", authenticate, createBooks)
router.get("/books", authenticate, getBooks)
router.get("/books/:bookId",authenticate, authorize, getBookById)
router.put("/books/:bookId",authenticate, authorize, updateBook)
router.delete("/books/:bookId",authenticate, authorize, deleteBookById)

module.exports = router