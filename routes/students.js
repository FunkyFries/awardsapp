const express = require("express");
const {
  Student,
  validateStudent,
  validateUpdate
} = require("../models/students");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// Get all students
router.get("/", ensureAuthenticated, async (req, res) => {
  const students = await Student.find().sort("name");
  const data = { students };
  res.send(data);
});

// Get one student
router.get("/:id", ensureAuthenticated, async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) return res.status(404).send("Student not found.");

  res.send(student);
});

// Create a new student
router.post("/", ensureAuthenticated, async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.role === "admin") {
    const student = new Student({
      _id: req.body.id,
      name: req.body.name,
      teacher: req.body.teacher,
      allInAward: false,
      outstandingAchievement: false,
      wowAward: false,
      cougarCommunityService: false,
      ccsWriteup: "",
      terrificKid: false,
      terrificKidChosenBy: "null",
      terrificKidWriteUp: "",
      threeR: "none",
      acceleratedReader: false,
      threeRwriteUp: "",
      image: req.body.image,
      pastAwards: []
    });
    await student.save();
    res.send(student);
  } else {
    res.status(403).send("Not authorized");
  }
});

// Update student
router.put("/:id", ensureAuthenticated, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true
    }
  );

  if (!student) return res.status(404).send("Student not found.");

  res.send(student);
});

// Delete student
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  if (req.user.role === "admin") {
    const student = await Student.findOneAndRemove({ _id: req.params.id });

    if (!student) return res.status(404).send("Student not found.");

    res.send(student);
  } else {
    res.status(403).send("Not authorized");
  }
});

module.exports = router;
