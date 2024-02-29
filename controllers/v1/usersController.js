const userService = require("../../services/v1/userService");
const lessonsTakenService = require("../../services/v1/userService");
const wpmAccuracyService = require("../../services/v1/userService");
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

async function getDataByEmail(req, res) {
    // getting user email from query parameter
    userService.getDataByEmail(req.query.email).then((response) => {
        return res.status(201).send(response)
    })
}
const highScores = async (req, res) => {
    const result = await userService.highScores();
    if(result.success){
        return res.status(200).send(result.data);
    } else{
        return res.status(500).send({message: result.message});
    }
}

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


async function getAverageSpeed(req, res) {
    // getting user email from query parameter
    userService.getAverageSpeed(req.query.email).then((response) => {
        return res.status(201).send(response)
    })
}


async function getTopSpeed(req, res) {
    // getting user email from query parameter
    userService.getTopSpeed(req.query.email).then((response) => {
        return res.status(201).send(response)
    })
}


const saveWpmAccuracyRecords = async (req, res) => {
    const { userEmail } = req.params;
    const { wpmRecords, accuracyRecords, cpmRecords } = req.body;
    try {
        const result = await wpmAccuracyService.saveWpmAccuracyRecords(userEmail, wpmRecords, accuracyRecords, cpmRecords);
        if (result.success) {
            return res.status(201).json({ message: result.message });
        } else {
            return res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error: WPM and accuracy can't be saved:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createUser,
    getDataByEmail,
    getTotalLessonsTaken,
    getAverageSpeed,
    getTopSpeed, 
    highScores,
    saveWpmAccuracyRecords
};
