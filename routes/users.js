const express = require("express");
const { User, validateUser, validateUserUpdate } = require("../models/users");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// Get all users
router.get("/", ensureAuthenticated, async (req, res) => {
  if (req.user.role === "admin") {
    const users = await User.find().sort("name");
    const data = { users };
    res.send(data);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Get one user
router.get("/:id", ensureAuthenticated, async (req, res) => {
  if (req.user.role === "admin") {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Create a new user
router.post("/", ensureAuthenticated, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.role === "admin") {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      _id: req.body.id
    });
    await newUser.save();
    res.send(newUser);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Update user
router.put("/:id", ensureAuthenticated, async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.role === "admin") {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    if (!user) return res.status(404).send("User not found.");

    res.send(user);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Delete user
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  if (req.user.role === "admin") {
    const user = await User.findOneAndRemove({ _id: req.params.id });

    if (!user) return res.status(404).send("User not found.");

    res.send(user);
  } else {
    res.status(403).send("Not authorized");
  }
});

module.exports = router;
