const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    courseId:Number,
    imagelink:String,
    price:Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}