const { Meal } = require("../models/mealModel");
const { Product } = require("../models/productsModel");
const mongoose = require("mongoose");
const errors = require("../helpers/errors");
const { dateFormat } = require("../helpers/validationSchemas");

const getJournal = async (date, userId) => {
  const dateFormatValidated = dateFormat.validate({ onDay: date });
  if (dateFormatValidated.error) {
    throw new errors.ValidationError(dateFormatValidated.error);
  }
  const dateExists = await Meal.findOne({ onDay: date, userId: userId });
  if (!dateExists) {
    return false;
  }
  return dateExists;
};

const removeFoodItem = async ({ forDay, foodItemId }, userId) => {
  const dateFormatValidated = dateFormat.validate({ onDay: forDay });
  if (dateFormatValidated.error) {
    throw new errors.ValidationError(dateFormatValidated.error);
  }
  const dateExists = await Meal.findOne({ onDay: forDay, userId: userId });
  if (!dateExists) {
    throw new errors.ProjectErrors("No data for selected day and user");
  }
  await Meal.updateOne(
    {
      onDay: forDay,
      userId: userId,
    },
    { $pull: { food: { _id: foodItemId } } }
  );
};

const addFoodItem = async (body, userId) => {
  const dateExists = await Meal.findOne({ onDay: body.onDay, userId: userId });
  const productKcal = await Product.findOne(
    { "title.ru": body.foodItem },
    { weight: 1, calories: 1 }
  );
  if (!productKcal) {
    throw new errors.ProjectErrors("Such food item not found");
  }
  const kcalPerGr = productKcal.calories / productKcal.weight;
  const newFoodItem = {
    foodItem: body.foodItem,
    portionSize: body.portionSize,
    kcal: (body.portionSize * kcalPerGr).toFixed(2),
    _id: mongoose.Types.ObjectId(),
  };
  if (!dateExists) {
    const newMealItem = {
      onDay: body.onDay,
      userId: userId,
      food: newFoodItem,
    };
    const meal = new Meal(newMealItem);
    await meal.save();
    return meal;
  }
  await Meal.updateOne(
    { onDay: body.onDay, userId: userId },
    { $push: { food: newFoodItem } }
  );
  const updatedDayJournal = await Meal.findOne({
    onDay: body.onDay,
    userId: userId,
  });
  return updatedDayJournal;
};

module.exports = {
  getJournal,
  removeFoodItem,
  addFoodItem,
};
