const userService = require("../../services/v1/userService");

const createUser = async (req, res) => {
    const userData = req.body;
    const result = await userService.createUser(userData);
    if (result.success) {
        return res.status(201).send({ message: result.message });
    } else {
        return res.status(500).send({ message: result.message });
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

module.exports = {
    createUser,
    getAverageSpeed,
    getTopSpeed
};
