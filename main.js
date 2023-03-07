const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {})
  .catch((error) => {
    console.error(error);
  });

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitializedt: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// setting template engine
app.set("view engine", "ejs");
app.use("", require("./routes/routes"));

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {});
