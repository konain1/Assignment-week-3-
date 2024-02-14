const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {AdminSchema,Admin} = require('../db/index')

// Admin Routes


router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    try {
        // Step 3: Save admin
        const { username, password } = req.body;
        
        // Check if the username already exists
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return res.status(400).json({ msg: "Username is already taken" });
        }

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        res.json({ msg: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});


// need to handle adminMiddleware

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    let {title,description,price,imagelink,courseId} = req.body;

    res.json({msg:'Course created successfully'})
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;