const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Edit user
router.put("/:id", userController.editUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
