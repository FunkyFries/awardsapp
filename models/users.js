const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    _id: {
      type: String
    },
    name: {
      type: String
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
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

function validateUserUpdate(user) {
  const schema = {
    name: Joi.string(),
    email: Joi.string(),
    role: Joi.string()
  };
  return Joi.validate(user, schema);
}

module.exports = { User, validateUser, validateUserUpdate };
