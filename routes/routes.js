const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  get_users,
  add_user,
  update_user,
  get_user,
  delete_user,
} = require("../controller/user.controller");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});


// for files uploading
const upload = multer({
  storage: storage,
}).single("image");

// getting users data
router.get("/", get_users);

// getting user data for the form
router.get("/:id", get_user);

// adding user
router.post("/add", upload, add_user);

// updating user's data
router.post("/update/:id", upload, update_user);


// deleting user
router.post("/delete/:id", delete_user);

module.exports = router;
