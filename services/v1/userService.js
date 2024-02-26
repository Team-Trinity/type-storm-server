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

async function getAverageSpeed(email) {
    try {

        const data = await User.findOne({ email: email })

        if (data) {
            const sum = data.wpmRecords.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
            const average = sum / data.wpmRecords.length;
            return { "average": average }
        } else {
            return { success: false, message: "user not found" }

        }

    } catch (error) {

        console.error("Error: couldn't get average wpm", error);
        return { success: false, message: "Failed to get average wpm" };
    }
}

async function getTopSpeed(email) {
    try {

        const data = await User.findOne({ email: email })

        if (data) {
            const highestWPM = Math.max(...data.wpmRecords)
            return { "highest": highestWPM }
        } else {
            return { success: false, message: "user not found" }

        }

    } catch (error) {

        console.error("Error: couldn't get top wpm", error);
        return { success: false, message: "Failed to get top wpm" };
    }
}

module.exports = {
    createUser,
    getAverageSpeed,
    getTopSpeed
};
