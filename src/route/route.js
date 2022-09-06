const express = require('express');
const router = express.Router();
const authorController = require('../Controllers/authorController');
const blogController = require('../Controllers/blogController');

router.get('/test-me', (req, res) =>{
    console.log('I am running');
    res.send('I am running')
});

router.post('/authors', authorController.createAuthor);

router.post('/blogs', blogController.createBlog);

router.get('/blogs', blogController.getBlog);
// router.get('/blogss', blogController.getByAutherId);







module.exports = router
