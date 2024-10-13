const express = require("express");
const router = express.Router();
const { adminLogin, seedAdmin } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", adminLogin);

router.get("/dashboard", authMiddleware, (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to Admin Dashboard" });
});

module.exports = router;
