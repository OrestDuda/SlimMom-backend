const Joi = require("joi");
const errors = require("../helpers/errors");

module.exports = {
  userLoginValidation: async (req, res, next) => {
    const userValidation = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .max(8)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    });

    const validationResult = await userValidation.validate(req.body);
    if (validationResult.error) {
      next(
        new errors.ValidationError(validationResult.error.details[0].message)
      );
    }
    next();
  },
};
