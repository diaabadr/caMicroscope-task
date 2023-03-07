const emailValidator = require("email-validator");
const fs = require("fs");
const User = require("../models/user");

const get_users = async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { title: "Home", users: users });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
};

const add_user = async (req, res) => {
  try {
    if (!emailValidator.validate(req.body.email)) {
      fs.unlinkSync("./public/uploads/" + req.file.filename);
      req.session.message = {
        message: "Email Is not valid",
        type: "danger",
      };
      return res.redirect("/");
    }
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
    fs.unlinkSync("./public/uploads/" + req.file.filename);
    // checking for duplicate email
    if (error.code === 11000) {
      req.session.message = {
        type: "danger",
        message: "Credentials taken (Email or phone already exist)",
      };
      return res.redirect("/");
    }
    return res.status(404).send({ error: error.message });
  }
};

const update_user = async (req, res) => {
  if (!emailValidator.validate(req.body.email)) {
    if (req.file) {
      fs.unlinkSync("./public/uploads/" + req.file.filename);
    }
    req.session.message = {
      message: "Email is not valid",
      type: "danger",
    };
    return res.redirect("/");
  }
  let newImage = req.body.old_image;
  if (req.file) {
    newImage = req.file.filename;
    try {
      fs.unlinkSync(`./public/uploads/${req.body.old_image}`);
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  }
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: newImage,
    });
    req.session.message = {
      type: "success",
      message: "User Updated Successfully",
    };
    res.redirect("/");
  } catch (error) {
    if (req.file) {
      fs.unlinkSync("./public/uploads/" + req.file.filename);
    }
    if (error.code === 11000) {
      req.session.message = {
        type: "danger",
        message: "Credentials taken (Email or phone already exist)",
      };
      return res.redirect("/");
    }
    res.send({ message: error.message });
  }
};

const get_user = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    // checking that user is not null
    if (!user) {
      req.session.message = {
        type: "danger",
        message: "User Not found",
      };
      return res.status(400).json({ message: "User Not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.send({ message: error.message });
  }
};

const delete_user = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    fs.unlinkSync(`./public/uploads/${user.image}`);
    req.session.message = {
      type: "success",
      message: "User deleted successfully",
    };
    res.redirect("/");
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = { get_users, get_user, delete_user, update_user, add_user };
