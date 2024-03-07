const User = require("../../models/v1/User");

const createUser = async ({
    name,
    email,
    role,
    lessonsTaken,
    wpmRecords,
    cpmRecords,
    accuracyRecords,
    practiceTime
}) => {
    try {
        const user = new User({
            name,
            email,
            role,
            lessonsTaken,
            wpmRecords,
            cpmRecords,
            accuracyRecords,
            practiceTime
        });
        await user.save();
        return { success: true, message: "User details have been saved" };
    } catch (error) {
        console.error("Error: can't save user details:", error);
        return { success: false, message: "Failed to save user details" };
    }
};

// Get all user data
async function getUsers(filter) {
    const sortField = {};

    if (filter.sort) {
        if (filter.sort.startsWith("-")) {
            sortField[filter.sort.slice(1)] = -1;
        } else {
            sortField[filter.sort] = 1;
        }
        delete filter.sort;
    }

    try {
        const data = await User.find(filter).sort(sortField);
        // console.log(data);

        return data;
    } catch (error) {
        console.error("Error: couldn't get users data", error);
        return { success: false, message: "Failed to get users data" };
    }
}

async function getUserByEmail(email) {
    try {
        const data = await User.findOne({ email: email });
        console.log(data);
        if (!data) {
            return { success: false, message: "User not found" };
        }

        // // Extracting necessary fields
        // const { wpmRecords, cpmRecords, accuracyRecords } = data;
        // // Finding the maximum value in wpmRecords and cpmRecords
        // const maxWPM = Math.max(...wpmRecords);
        // const maxCPM = Math.max(...cpmRecords);
        // // Calculating average speed
        // const totalSpeed = wpmRecords.reduce((acc, val) => acc + val, 0);
        // const avgSpeed = totalSpeed / wpmRecords.length;
        // // Calculating average accuracy
        // const totalAccuracy = accuracyRecords.reduce(
        //     (acc, val) => acc + val,
        //     0
        // );
        // const avgAccuracy = totalAccuracy / accuracyRecords.length;
        // // Calculating number of lessons taken
        // const lessonsTakenCount = wpmRecords.length;
        // return {
        //     success: true,
        //     message: "get request of getDataByEmail successful",
        //     data: {
        //         maxWPM,
        //         maxCPM,
        //         avgSpeed,
        //         avgAccuracy,
        //         lessonsTaken: lessonsTakenCount
        //     }
        // };

        return data;
    } catch (error) {
        console.error("Error: couldn't get user data", error);
        return { success: false, message: "Failed to get user data" };
    }
}

const updateUserByEmail = async (userEmail, newData) => {
    try {
        console.log("Updating user", userEmail);
        console.log("New Data", newData);
        const response = await User.updateOne({ email: userEmail }, newData);
        if (response.modifiedCount > 0) {
            return {
                success: true,
                message: "User updated successfully",
                data: response
            };
        } else {
            return {
                success: false,
                message: "No new data or User not found"
            };
        }
    } catch (error) {
        console.error("Error: User can't be updated", error);
        return { success: false, message: "Failed to update user" };
    }
};

async function deleteUserByEmail(email) {
    try {
        const response = await User.deleteOne({
            email: email
        });
        console.log("Removed successfully");
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error: Couldn't delete user", error);
        return { success: false, message: "Failed to delete user" };
    }
}

// const highScores = async () => {
//     try {
//         const topScorers = await User.find(
//             { role: "student" },
//             "name wpmRecords cpmRecords"
//         )
//             .sort({ wpmRecords: -1 })
//             .limit(10);
//         topScorers.sort(
//             (a, b) => Math.max(...b.wpmRecords) - Math.max(...a.wpmRecords)
//         );
//         // Get the name of the user with the highest WPM
//         // return { success: true, message: "HighScorerDetails get request successfull", data:topScorers}
//         const topUsersData = topScorers.slice(0, 10).map((user) => ({
//             name: user.name,
//             topWpm: Math.max(...user.wpmRecords),
//             totalCpm: user.cpmRecords.reduce((acc, curr) => acc + curr, 0) // Sum of all items in cpmRecords array
//         }));

//         return {
//             success: true,
//             message: "HighScorerDetails get request successful",
//             data: topUsersData
//         };
//     } catch (error) {
//         console.error("Error: can't get highScores details: ", error);
//         return { success: false, message: "Failed to get high scores" };
//     }
// };

// async function getAverageSpeed(email) {
//     try {
//         const data = await User.findOne({ email: email });

//         if (data) {
//             const sum = data.wpmRecords.reduce((accumulator, currentValue) => {
//                 return accumulator + currentValue;
//             }, 0);
//             const average = sum / data.wpmRecords.length;
//             return { average: average };
//         } else {
//             return { success: false, message: "user not found" };
//         }
//     } catch (error) {
//         console.error("Error: couldn't get average wpm", error);
//         return { success: false, message: "Failed to get average wpm" };
//     }
// }

// async function getTopSpeed(email) {
//     try {
//         const data = await User.findOne({ email: email });

//         if (data) {
//             const highestWPM = Math.max(...data.wpmRecords);
//             return { highest: highestWPM };
//         } else {
//             return { success: false, message: "user not found" };
//         }
//     } catch (error) {
//         console.error("Error: couldn't get top wpm", error);
//         return { success: false, message: "Failed to get top wpm" };
//     }
// }

// const calculateLessonsTaken = (wpmRecords, accuracyRecords) => {
//     const lessonsTaken = Math.min(wpmRecords.length, accuracyRecords.length);
//     return lessonsTaken;
// };

module.exports = {
    createUser,
    getUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail
};
