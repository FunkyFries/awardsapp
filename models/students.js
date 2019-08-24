const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Student = mongoose.model(
  "Students",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    teacher: {
      type: String,
      required: true
    },
    aHonorRoll: {
      type: Boolean,
      required: true
    },
    abHonorRoll: {
      type: Boolean,
      required: true
    },
    terrificKid: {
      type: Boolean,
      required: true
    },
    terrificKidChosenBy: {
      type: String
    },
    threeR: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  })
);

function validateStudent(student) {
  const schema = {
    name: Joi.string().required(),
    grade: Joi.string().required(),
    teacher: Joi.string().required(),
    awards: Joi.array()
  };
  return Joi.validate(student, schema);
}

function validateUpdate(student) {
  const schema = {
    name: Joi.string(),
    grade: Joi.string(),
    teacher: Joi.string(),
    awards: Joi.array()
  };
  return Joi.validate(student, schema);
}

module.exports = { Student, validateStudent, validateUpdate };
