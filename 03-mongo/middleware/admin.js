// Middleware for handling auth
let {Admin} = require('../db');

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    // Check readme for the exact headers to be expected
    let { username, password } = req.headers;

    try {
        let userExist = await Admin.findOne({ username });
        // const existingAdmin = await Admin.findOne({ username });


        if (userExist) {
            if (userExist.password == password) {
                next();
            } else {
                res.status(401).json({ msg: "Invalid password" });
            }
        } else {
            res.status(403).json({ msg: "Invalid Admin" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = adminMiddleware;
