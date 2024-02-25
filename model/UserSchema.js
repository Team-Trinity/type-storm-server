const mongoose = require("mongoose");


const userModel = new mongoose.Schema(
    {
        name: String,
        email: String,
        role: String,
        lessonsTaken: Number,
        recordedSpeeds: [Number],
        averageSpeed: Number,
        totalTypedWords: Number,        
    }
);
const UserSchema = mongoose.model("UserSchema", userModel); 
module.exports = UserSchema;

