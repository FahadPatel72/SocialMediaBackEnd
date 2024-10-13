const User = require("../models/User");
const path = require("path");

const uploadUserData = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files were uploaded",
      });
    }

    let images = [];
    const uploadedFiles = req.files.images;

    if (Array.isArray(uploadedFiles)) {
      uploadedFiles.forEach((file) => {
        const fileName = Date.now() + "-" + file.name;
        const uploadPath = path.join(__dirname, "../uploads/", fileName);
        file.mv(uploadPath);
        images.push(fileName);
      });
    } else {
      const fileName = Date.now() + "-" + uploadedFiles.name;
      const uploadPath = path.join(__dirname, "../uploads/", fileName);
      uploadedFiles.mv(uploadPath);
      images.push(fileName);
    }

    const user = new User({
      name,
      socialHandle,
      images,
    });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User data and images uploaded successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadUserData,
  getAllUsers,
};
