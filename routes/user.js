const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db');
const { pass } = require("../config");
const jwt = require("jsonwebtoken")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    User.create({
        username:req.body.username,
        password:req.body.password
    })
    res.json('user created successfully')
});


router.post('/signin', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    console.log(pass)
    const token=jwt.sign({username},pass)
    res.json(token)
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then(function(val){
        res.json(val)
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.body.username;
    const user = await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    console.log(user)
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({username:req.body.username}).then((val)=>{
        Course.find({_id:
            {"$in":val.purchasedCourses}
        }).then((course)=>{
            res.json(course)
            console.log(course)
        })
    })
});

module.exports = router