const User = require("../../models/v1/User");

const createUser = async ({ name,email, role, lessonsTaken, wpmRecords,cpmRecords,accuracyRecords,practiceTime }) => {
    try {
        const user = new User({ name,email, role, lessonsTaken, wpmRecords,cpmRecords,accuracyRecords,practiceTime });
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
