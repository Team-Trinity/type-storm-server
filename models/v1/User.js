const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({    
    name: String,
    email: String,
    role: String,
    lessonsTaken: Number,
    wpmRecords: [Number],
    cpmRecords: [Number],
    accuracyRecords: [Number],
    practiceTime: Number,      
});

const User = mongoose.model("User", userSchema); 
module.exports = User;