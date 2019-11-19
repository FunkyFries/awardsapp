const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

// All In Award: each teacher chooses a student who exemplifies

// Outstanding Achievement Award: Each teacher chooses a student who has shown growth, grit, achievement, determination, etc.

// WOW Award: 3-6 teachers select all students who have met their semester goals in Q2 and Q4 awards assemblies only

// Cougar Community Service: Debbie chooses 1 student from K-2, and 2 students from 3-6

const Student = mongoose.model(
  "Students",
  new mongoose.Schema({
    _id: {
      type: String
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    teacher: {
      type: String
    },
    allInAward: {
      type: Boolean
    },
    // allInWriteup: {
    //   type: String
    // },
    outstandingAchievement: {
      type: Boolean
    },
    // outstandingWriteup: {
    //   type: String
    // },
    wowAward: {
      type: Boolean
    },
    cougarCommunityService: {
      type: Boolean
    },
    ccsWriteup: {
      type: String
    },
    terrificKid: {
      type: Boolean
    },
    terrificKidChosenBy: {
      type: String
    },
    terrificKidWriteUp: {
      type: String
    },
    threeR: {
      type: String
    },
    threeRwriteUp: {
      type: String
    },
    image: {
      type: String
    },
    acceleratedReader: {
      type: Boolean
    },
    pastAwards: {
      type: Array
    }
  })
);

function validateStudent(student) {
  const schema = {
    id: Joi.string().required(),
    name: Joi.string().required(),
    teacher: Joi.string().required(),
    image: Joi.string().allow("")
  };
  return Joi.validate(student, schema);
}

function validateUpdate(student) {
  const schema = {
    name: Joi.string(),
    teacher: Joi.string(),
    image: Joi.string().allow(""),
    allInAward: Joi.boolean(),
    // allInWriteup: Joi.string(),
    outstandingAchievement: Joi.boolean(),
    // outstandingWriteup: Joi.string(),
    wowAward: Joi.boolean(),
    cougarCommunityService: Joi.boolean(),
    ccsWriteup: Joi.string(),
    terrificKid: Joi.boolean(),
    terrificKidChosenBy: Joi.string(),
    terrificKidWriteUp: Joi.string(),
    threeR: Joi.string(),
    threeRwriteUp: Joi.string(),
    acceleratedReader: Joi.boolean(),
    pastAwards: Joi.array()
  };
  return Joi.validate(student, schema);
}

module.exports = { Student, validateStudent, validateUpdate };
