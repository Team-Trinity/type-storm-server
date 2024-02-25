const UserSchema = require("../model/UserSchema");


const createUserDetails = async (req, res) => {
    const { name, email, roles, lessonsTaken, recordedSpeeds, averageSpeed, totalTypedWords } = req.body;
    try {
        const userDetails = new UserSchema({ name, email, roles, lessonsTaken, recordedSpeeds, averageSpeed, totalTypedWords });
        await userDetails.save();
        return res.status(201).send({message: "User details have been saved"});
    }
    catch (err) {
        console.log("Something went wrong");
    }
}

module.exports = {
    createUserDetails
}