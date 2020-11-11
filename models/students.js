const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Student = mongoose.model(
  "Students",
  new mongoose.Schema({
    _id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    teacher: {
      type: String,
    },
    allInAward: {
      type: Boolean,
    },
    outstandingAchievement: {
      type: Boolean,
    },
    wowAward: {
      type: Boolean,
    },
    cougarCommunityService: {
      type: Boolean,
    },
    communityServiceChosenBy: {
      type: String,
    },
    ccsWriteup: {
      type: String,
    },
    terrificKid: {
      type: Boolean,
    },
    terrificKidChosenBy: {
      type: String,
    },
    terrificKidWriteUp: {
      type: String,
    },
    threeR: {
      type: String,
    },
    threeRwriteUp: {
      type: String,
    },
    image: {
      type: String,
    },
    acceleratedReader: {
      type: Boolean,
    },
    words: {
      type: Number,
    },
    pastAwards: {
      type: Array,
    },
  })
);

function validateStudent(student) {
  const schema = {
    id: Joi.string().required(),
    name: Joi.string().required(),
    teacher: Joi.string().required(),
    image: Joi.string().allow(""),
  };
  return Joi.validate(student, schema);
}

function validateUpdate(student) {
  const schema = {
    name: Joi.string(),
    teacher: Joi.string(),
    image: Joi.string().allow(""),
    allInAward: Joi.boolean(),
    outstandingAchievement: Joi.boolean(),
    wowAward: Joi.boolean(),
    cougarCommunityService: Joi.boolean(),
    communityServiceChosenBy: Joi.string(),
    ccsWriteup: Joi.string(),
    terrificKid: Joi.boolean(),
    terrificKidChosenBy: Joi.string(),
    terrificKidWriteUp: Joi.string(),
    threeR: Joi.string(),
    threeRwriteUp: Joi.string(),
    acceleratedReader: Joi.boolean(),
    words: Joi.number(),
    pastAwards: Joi.array(),
  };
  return Joi.validate(student, schema);
}

module.exports = { Student, validateStudent, validateUpdate };
