const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../model/User");
const key = require("../../config/keys").secret;

// Post request for register a user
router.post("/register", (req, res) => {
  let { name, username, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.status(400).json({
      msg: "Password do not match",
    });
  }

  // Check Valid username
  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Username already used",
      });
    }
  });

  // Check for valid email
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: "Email already used",
      });
    }
  });

  // Now Adding a new User
  let newUser = new User({
    name,
    username,
    email,
    password,
  });
  // Hashing the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        return res.status(200).json({
          success: true,
          // user: user,
          msg: "User is now registered",
        });
      });
    });
  });
});

// Post request for loging a user
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(404).json({
        msg: "User not Found",
        success: false,
      });
    }

    // If user found then we are hashing a password
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        // Creating a payload if match
        const payLoad = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
        // Assinging a JWT token
        jwt.sign(payLoad, key, { expiresIn: 604800 }, (err, token) => {
          res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: user,
            msg: "You are logged in",
          });
        });
      } else {
        return res.status(404).json({
          msg: "Username and Password is invalid",
          success: false,
        });
      }
    });
  });
});

// Get Request for getting a Profile and also it is protected route
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);
module.exports = router;
