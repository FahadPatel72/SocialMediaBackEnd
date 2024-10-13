const express = require("express");
const router = express.Router();
const {
  uploadUserData,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload", uploadUserData);

router.get("/all", authMiddleware, getAllUsers);

module.exports = router;
