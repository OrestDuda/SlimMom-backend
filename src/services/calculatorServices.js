const { Product } = require("../models/productsModel");
const { User } = require("../models/userModel");
const errors = require("../helpers/errors");
const { getDailyLimit, getUniqueCategories } = require("../helpers/helpers");
const { newEntryValidation } = require("../helpers/validationSchemas");

const publicCalc = async (body) => {
  const validated = newEntryValidation.validate(body);
  if (validated.error) {
    throw new errors.ValidationError(validated.error);
  }
  const { currentWeight, height, age, desiredWeight, bloodType } = body;
  const dailyLimit = getDailyLimit(currentWeight, height, age, desiredWeight);
  const notRecommended = await Product.find(
    {
      ["groupBloodNotAllowed." + bloodType]: { $eq: true },
    },
    { categories: 1, _id: 0 }
  );
  const notRecommendedCategories = getUniqueCategories(notRecommended);
  return {
    dailyLimit,
    notRecommendedCategories,
  };
};

const userCalc = async (body, userID) => {
  const userFound = await User.findOne({ _id: userID }, { password: 0 });
  if (!userFound) {
    throw new errors.ProjectErrors("No such user");
  }
  const target = await publicCalc(body);
  userFound.currentWeight = body.currentWeight;
  userFound.height = body.height;
  userFound.age = body.age;
  userFound.desiredWeight = body.desiredWeight;
  userFound.bloodType = body.bloodType;
  userFound.dailyLimit = target.dailyLimit;
  userFound.notRecommended = target.notRecommendedCategories;
  await userFound.save();
  return userFound;
};

module.exports = {
  publicCalc,
  userCalc,
};
