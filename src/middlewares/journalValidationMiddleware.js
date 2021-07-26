const Joi = require("joi");
const errors = require("../helpers/errors");

module.exports = {
  addItemValidation: async (req, res, next) => {
    const journalValidation = Joi.object({
      foodItem: Joi.string().required(),
      portionSize: Joi.number().required(),
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
