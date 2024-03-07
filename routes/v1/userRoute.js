const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const usersController = require("../../controllers/v1/userController");
const wpmAccuracyController = require("../../controllers/v1/userController");

// Get all users
router.get("/users", morgan("dev"), usersController.getUsers);

// Post new user
// router.post("/:userEmail/wpm-accuracy-records", wpmAccuracyController.saveWpmAccuracyRecords);
router.post("/users", morgan("dev"), usersController.createUser);

// GET a user with its email
router.get("/users/:email", morgan("dev"), usersController.getUserByEmail);

// Update user by email
router.patch("/users/:email", morgan("dev"), usersController.updateUserByEmail);

// Delete a user by email
router.delete(
    "/users/:email",
    morgan("dev"),
    usersController.deleteUserByEmail
);

// No need for these. We can calculate this on frontend
// router.get("/:userEmail/lessons-taken", usersController.getTotalLessonsTaken);
// router.get("/average",morgan("dev"), usersController.getAverageSpeed);
// router.get("/top",morgan("dev"), usersController.getTopSpeed);

module.exports = router;
