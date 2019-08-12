const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    name: {
      type: String
    },
    grade: {
      type: String,
      enum: ["K", "1", "2", "3", "4", "5", "6", "Specialist", "Admin"]
    },
    email: {
      type: String
    },
    role: {
      type: String
    }
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    grade: Joi.enum().required(),
    email: Joi.string().required(),
    role: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

module.exports = { User, validateUser };
