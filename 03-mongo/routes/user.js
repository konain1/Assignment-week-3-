const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const  {User} = require('../db')
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    let {username,password} = req.body;
 
    let userExist = await User.findOne({username})

    if(userExist){
        return res.status(403).json({msg:"username already Exist try another name"})
    }

    let newUser = new User({username:username,password:password})
    newUser.save().then(()=>{console.log("new user created")})
    
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