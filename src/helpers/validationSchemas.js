const Joi = require("joi").extend(require("@joi/date"));

const newEntryValidation = Joi.object({
  height: Joi.number().integer().positive().required(),
  age: Joi.number().integer().positive().required(),
  currentWeight: Joi.number().positive().required(),
  desiredWeight: Joi.number().positive().required(),
  bloodType: Joi.any().valid(1, 2, 3, 4).required(),
});

const dateFormat = Joi.object({
  onDay: Joi.date().format("YYYY-MM-DD"),
});

module.exports = { newEntryValidation, dateFormat };
