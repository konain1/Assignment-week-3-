const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const  {User,Course} = require('../db')
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

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    let allCourses = await Course.find({})

    res.json({courses:allCourses})

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    let courseId = req.params.courseId;
    let username = req.body.username;

     await User.updateOne({username:username},{

        '$push':{
            purchasedCoursed:courseId
        }
        
    })
    res.json({msg:'course purchased'})
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    let username = req.headers.username;

    let user = await User.findOne({username})
    // console.log(user)

    let myCourses = await Course.find({

        _id:{
            '$in':user.purchasedCoursed
        }
    })

    res.json({mycourses:myCourses})
    
});

module.exports = router