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

async function getUsers(req, res) {
    try {
        const response = await userService.getUsers(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error: couldn't get users data", error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to get users data" });
    }
}

async function getUserByEmail(req, res) {
    try {
        const response = await userService.getUserByEmail(req.params.email);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error: couldn't get user data", error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to get user data" });
    }
}

const updateUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const result = await userService.updateUserByEmail(email, req.body);
        if (result.success) {
            return res
                .status(200)
                .json({ message: result.message, data: result.data });
        } else {
            return res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error: WPM and accuracy can't be saved:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

async function deleteUserByEmail(req, res) {
    try {
        const response = await userService.deleteUserByEmail(req.params.email);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error: couldn't delete", error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to delete user" });
    }
}
// async function getDataByEmail(req, res) {

//     userService.getDataByEmail(req.query.email).then((response) => {
//         return res.status(201).send(response)
//     })
// }

// const highScores = async (req, res) => {
//     const result = await userService.highScores();
//     if (result.success) {
//         return res.status(200).send(result.data);
//     } else {
//         return res.status(500).send({ message: result.message });
//     }
// };

// const getTotalLessonsTaken = async (req, res) => {
//     const { userEmail } = req.params;
//     try {
//         const user = await User.findOne({ email: userEmail });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const lessonsTaken = lessonsTakenService.calculateLessonsTaken(
//             user.wpmRecords,
//             user.accuracyRecords
//         );
//         return res.status(200).json({ number_of_lessons_taken: lessonsTaken });
//     } catch (error) {
//         console.error("Error happened on lessons count:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// async function getAverageSpeed(req, res) {
//     // getting user email from query parameter
//     userService.getAverageSpeed(req.query.email).then((response) => {
//         return res.status(201).send(response);
//     });
// }

// async function getTopSpeed(req, res) {
//     // getting user email from query parameter
//     userService.getTopSpeed(req.query.email).then((response) => {
//         return res.status(201).send(response);
//     });
// }

module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail
};
