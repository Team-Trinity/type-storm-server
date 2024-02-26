const express = require("express");
const router = express.Router();
const morgan = require("morgan")
const usersController = require("../../controllers/v1/usersController");

router.get("/:userEmail/lessons-taken", usersController.getTotalLessonsTaken);
router.post("/",morgan("dev"), usersController.createUser);
router.get("/average",morgan("dev"), usersController.getAverageSpeed);
router.get("/top",morgan("dev"), usersController.getTopSpeed);
router.get("/dashboard/high-scores", usersController.highScores)
module.exports = router;
