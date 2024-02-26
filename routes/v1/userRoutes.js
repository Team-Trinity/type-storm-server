const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/v1/usersController");


router.post("/", usersController.createUser);
router.get("/dashboard/high-scores", usersController.highScores)
module.exports = router;
