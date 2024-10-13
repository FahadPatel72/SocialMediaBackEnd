const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const path = require("path");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: 'https://your-netlify-site.netlify.app' 
}));

const dbConnect = require("./config/database");
dbConnect();

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
