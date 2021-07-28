const Joi = require("joi").extend(require("@joi/date"));
const errors = require("../helpers/errors");

module.exports = {
  addItemValidation: async (req, res, next) => {
    const journalValidation = Joi.object({
      foodItem: Joi.string().required(),
      portionSize: Joi.number().positive().required(),
      onDay: Joi.date().format("YYYY-MM-DD").required(),
    });

    const validationResult = await journalValidation.validate(req.body);
    if (validationResult.error) {
      next(
        new errors.ValidationError(validationResult.error.details[0].message)
      );
    }
    next();
  },
};
