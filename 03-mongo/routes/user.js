const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const  UserSchema = require('../db')
// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    let {username,password} = req.body;

    res.json({msg:'User created successfully'})



});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router