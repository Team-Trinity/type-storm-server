const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/v1/usersController");

router.post("/", usersController.createUser);
router.get("/:userEmail/lessons-taken", usersController.getTotalLessonsTaken);

module.exports = router;
