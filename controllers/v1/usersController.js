const userService = require("../../services/v1/userService");
const lessonsTakenService = require("../../services/v1/lessonsTakenService");
const User = require("../../models/v1/User");


const createUser = async (req, res) => {
    const userData = req.body;
    const result = await userService.createUser(userData);
    if (result.success) {
        return res.status(201).send({ message: result.message });
    } else {
        return res.status(500).send({ message: result.message });
    }
};


const getTotalLessonsTaken = async (req, res) => {
    const { userEmail } = req.params;
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const lessonsTaken = lessonsTakenService.calculateLessonsTaken(user.wpmRecords, user.accuracyRecords);        
        return res.status(200).json({ number_of_lessons_taken: lessonsTaken });
    } catch (error) {
        console.error("Error happened on lessons count:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createUser,
    getTotalLessonsTaken
};
