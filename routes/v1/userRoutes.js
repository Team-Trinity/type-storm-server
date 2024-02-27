const express = require("express");
const router = express.Router();
const morgan = require("morgan")
const usersController = require("../../controllers/v1/usersController");
const wpmAccuracyController  = require("../../controllers/v1/usersController");

router.post("/:userEmail/wpm-accuracy-records", wpmAccuracyController.saveWpmAccuracyRecords);
router.get("/:userEmail/lessons-taken", usersController.getTotalLessonsTaken);
router.post("/",morgan("dev"), usersController.createUser);
router.get("/average",morgan("dev"), usersController.getAverageSpeed);
router.get("/top",morgan("dev"), usersController.getTopSpeed);
router.get("/dashboard/high-scores", usersController.highScores)
module.exports = router;
