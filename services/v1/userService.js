const User = require("../../models/v1/User");

const createUser = async ({ name, email, role, lessonsTaken, wpm, averageSpeed, totalTypedWords }) => {
    try {
        const user = new User({ name, email, role, lessonsTaken, wpm, averageSpeed, totalTypedWords });
        await user.save();
        return { success: true, message: "User details have been saved" };
    } catch (error) {
        console.error("Error: can't save user details:", error);
        return { success: false, message: "Failed to save user details" };
    }
};

module.exports = {
    createUser
};
