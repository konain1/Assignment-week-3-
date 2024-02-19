const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require('../db')
const jwt = require('jsonwebtoken');
const {secret} = require("../config");
// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    // Implement admin signup logic
    try {
        // Step 3: Save admin
        const { username, password } = req.body;
        
        // Check if the username already exists
        // const existingAdmin = await Admin.findOne({ username });

        // if (existingAdmin) {
        //     return res.status(400).json({ msg: "Username is already taken" });
        // }

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        res.json({ msg: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic

    const { username, password } = req.body;

    let user  = await Admin.find({username})

    if(user){
    let token = jwt.sign({username},secret)
    res.json({msg:token})
    }

    res.status(411).json({msg:'Incorrect username'})
    

});

// router.post('/courses', adminMiddleware, (req, res) => {
//     // Implement course creation logic
// });

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    let {title,description,price,imagelink} = req.body;

    let newCourse = new Course({title,description,price,imagelink})
    await newCourse.save()

    res.json({msg:'Course created successfully',courseId : newCourse._id })
});

// router.get('/courses', adminMiddleware, (req, res) => {
//     // Implement fetching all courses logic
// });

module.exports = router;