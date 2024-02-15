
const {User} = require('../db')


async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. 
    // Check readme for the exact headers to be expected

    let { username, password } = req.headers;

    try {
        let userExist = await User.findOne({ username });
        // const existingAdmin = await Admin.findOne({ username });


        if (userExist) {
            if (userExist.password == password) {
                next();
            } else {
                res.status(401).json({ msg: "Invalid password" });
            }
        } else {
            res.status(403).json({ msg: "Invalid User" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = userMiddleware;