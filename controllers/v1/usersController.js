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

module.exports = {
    createUser
};
