const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login attempt: ", username);

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credential" });
    }
    console.log(admin);

    console.log("Entered password:", password);
    console.log("Stored password (hashed):", admin.password);

    const isMatch = await bcrypt.compare(password.trim(), admin.password);
    console.log(password.trim());
    console.log(isMatch);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log(isMatch);

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

exports.seedAdmin = async (req, res) => {
  try {
    const adminUsername = "fahad927";

    await Admin.deleteMany({});

    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this username!" });
    }

    const hashedPassword = await bcrypt.hash("fahad@456", 10);
    const newAdmin = new Admin({
      username: adminUsername,
      password: hashedPassword,
    });

    console.log("Hashed password during seeding: ", hashedPassword);

    await newAdmin.save();
    res.status(201).json({ message: "Admin account created successfully!" });
  } catch (error) {
    console.error("Error creating admin account:", error);
    res.status(500).json({ message: "Error creating admin account", error });
  }
};
