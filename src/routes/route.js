const express = require("express");
const router = express.Router();

const { createUsers, login } = require("../controllers/userControllers");
const { createBooks,getBookById } = require("../controllers/bookControllers");
const { authenticate } = require("../middlewares/auth");

router.post("/register",createUsers);
router.post("/login",login)
router.get("/auth",authenticate)
router.post("/books", createBooks)
router.get("/books/:bookId",getBookById)

module.exports = router