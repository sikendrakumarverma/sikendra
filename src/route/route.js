const express = require('express');
const router = express.Router();
const authorController = require('../Controllers/authorController');
const blogController = require('../Controllers/blogController');
const middleware = require('../middleware/mid')

router.get('/test-me', (req, res) => {
    console.log('I am running');
    res.send('I am running')
});

router.post('/authors', authorController.createAuthor);

router.post('/blogs', middleware.authentication, blogController.createBlog);

router.get('/blogs', middleware.authentication, blogController.getBlog); //middleware.Authorise, 

router.put('/blogs/:blogId', middleware.authentication, middleware.Authorise, blogController.updateBlog);

router.delete('/blogs/:blogId', middleware.authentication, middleware.Authorise, blogController.deleteBlog);

router.delete('/blogs', middleware.authentication, middleware.Authorise, blogController.deletebyquery);

router.post('/login', authorController.authorLogin)




module.exports = router
