const User = require("../../models/v1/User");

const createUser = async ({ name, email, role, lessonsTaken, wpmRecords,cpmRecords,accuracyRecords,practiceTime }) => {
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
        return { success: true, message: "HighScorerDetails get request successfull", data:topScorers}
    } catch(error){
        console.error("Error: can't get highScores details: ", error);
        return {success: false, message: "Failed to get high scores"};
    }
}

module.exports = {
    createUser, 
    highScores
};
