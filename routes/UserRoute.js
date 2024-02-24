const express = require("express");
const {createUserDetails} = require("../controller/userController");
const route = express.Router();


route.post("/", createUserDetails);

module.exports = route;