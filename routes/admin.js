const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course}=require('../db')
const router = Router();
const jwt = require('jsonwebtoken');
const { pass } = require("../config");

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    Admin.create({
        username,
        password
    })
        res.json('created')
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    console.log(pass)
    const token=jwt.sign({username},pass)
    res.json(token)
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const cr = await Course.create({
        title,
        description,
        price,
        imageLink
    })
    res.json("message: 'Course created successfully', courseId: "+cr._id)
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then(function(response){
        res.json(response)
    })
});

module.exports = router;