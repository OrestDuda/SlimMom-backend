const { Product } = require("../models/productsModel");
const { User } = require("../models/userModel");
const errors = require("../helpers/errors");
const { getDailyLimit } = require("../helpers/helpers");
const {
  newEntryValidation,
  updateEntryValidation,
} = require("../helpers/calculatorValidation");

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
    { categories: 1, title: 1 }
  );
  return {
    dailyLimit,
    notRecommended,
  };
};

const userCalc = async (body, userID) => {
  const userFound = await User.findOne({ _id: userID });
  if (!userFound) {
    throw new errors.ProjectErrors("No such user");
  }
  if (!userFound.dailyLimit) {
    const target = await publicCalc(body);
    userFound.currentWeight = body.currentWeight;
    userFound.height = body.height;
    userFound.age = body.age;
    userFound.desiredWeight = body.desiredWeight;
    userFound.bloodType = body.bloodType;
    userFound.dailyLimit = target.dailyLimit;
    userFound.notRecommended = target.notRecommended;
    await userFound.save();
    return target;
  }
  const validated = updateEntryValidation.validate(body);
  if (validated.error) {
    throw new errors.ValidationError(validated.error);
  }
  const { currentWeight, height, age, desiredWeight, bloodType } = body;
  const dailyLimit = getDailyLimit(
    currentWeight,
    height || userFound.height,
    age || userFound.age,
    desiredWeight
  );

  if (bloodType) {
    const notRecommended = await Product.find(
      {
        ["groupBloodNotAllowed." + bloodType]: { $eq: true },
      },
      { categories: 1, title: 1 }
    );
    userFound.currentWeight = body.currentWeight;
    userFound.height = body.height || userFound.height;
    userFound.age = body.age || userFound.age;
    userFound.desiredWeight = body.desiredWeight;
    userFound.dailyLimit = dailyLimit;
    userFound.bloodType = body.bloodType;
    userFound.notRecommended = notRecommended;
    await userFound.save();
    return {
      dailyLimit,
      notRecommended,
    };
  }
  userFound.currentWeight = body.currentWeight;
  userFound.height = body.height || userFound.height;
  userFound.age = body.age || userFound.age;
  userFound.desiredWeight = body.desiredWeight;
  userFound.dailyLimit = dailyLimit;
  await userFound.save();
  return {
    dailyLimit,
  };
};

module.exports = {
  publicCalc,
  userCalc,
};
