const express = require("express");
const router = express.Router();
const User = require("../models/user");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { title: "Home", users: users });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.post("/adduser", upload, async (req, res) => {
  try {
    // i have to validate data and check for duplicate emails
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    const newUser = await user.save();
    if (newUser)
      req.session.message = {
        type: "success",
        message: "User added successfully",
      };
    res.redirect("/");
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/add", (req, res) => {
  res.render("addusers", { title: "Add User" });
});

module.exports = router;
