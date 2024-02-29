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


const highScores = async() => {
    try{
        const topScorers = await User.find({role: "student"}, 'name wpmRecords cpmRecords').sort({wpmRecords: -1}).limit(10);
        topScorers.sort((a, b) => Math.max(...b.wpmRecords) - Math.max(...a.wpmRecords));
        // Get the name of the user with the highest WPM
        // return { success: true, message: "HighScorerDetails get request successfull", data:topScorers}
        const topUsersData = topScorers.slice(0, 10).map(user => ({
            name: user.name,
            topWpm: Math.max(...user.wpmRecords),
            totalCpm: user.cpmRecords.reduce((acc, curr) => acc + curr, 0) // Sum of all items in cpmRecords array
        }));

        return {
            success: true,
            message: "HighScorerDetails get request successful",
            data: topUsersData
        };
    } catch(error){
        console.error("Error: can't get highScores details: ", error);
        return {success: false, message: "Failed to get high scores"};
    }
}

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

const calculateLessonsTaken = (wpmRecords, accuracyRecords) => {
    const lessonsTaken = Math.min(wpmRecords.length, accuracyRecords.length);
    return lessonsTaken;
};


const saveWpmAccuracyRecords = async (userEmail, wpmRecords, accuracyRecords, cpmRecords) => {    
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            throw new Error("User not found");
        }
        user.wpmRecords.push(...wpmRecords);
        user.cpmRecords.push(...cpmRecords);
        user.accuracyRecords.push(...accuracyRecords);
        await user.save();
        return { success: true, message: "WPM and accuracy records saved successfully" };
    } catch (error) {
        console.error("Error: WPM and accuracy records can't be saved:", error);
        return { success: false, message: "Failed to save WPM and accuracy records" };
    }
};



module.exports = {
    createUser,
    highScores,
    getAverageSpeed,
    getTopSpeed,
    calculateLessonsTaken,
    saveWpmAccuracyRecords
};
