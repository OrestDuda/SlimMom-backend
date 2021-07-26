const { Meal } = require("../models/mealModel");
const { Product } = require("../models/productsModel");
const mongoose = require("mongoose");
const errors = require("../helpers/errors");
const { getCurrentDate } = require("../helpers/helpers");

const getProducts = async (query) => {
  if (!query) {
    throw new errors.ProjectErrors("Nothing entered to search");
  }
  const matched = await Product.find(
    {
      "title.ru": { $regex: query, $options: "i" },
    },
    { "title.ru": 1 }
  );

  return matched;
};
const getAllProducts = async () => {
  const fullCatalogue = await Product.find({});
  return fullCatalogue;
};

const getFoodItems = async (date, userId) => {
  const dateExists = await Meal.findOne({ onDay: date, userId: userId });
  if (!dateExists) {
    throw new errors.ProjectErrors("No data for selected day and user");
  }
  return dateExists;
};

const removeFoodItem = async ({ forDay, foodItemId }, userId) => {
  const currentDate = getCurrentDate();
  const listForDay = forDay || currentDate;
  const dateExists = await Meal.updateOne(
    {
      onDay: listForDay,
      userId: userId,
    },
    { $pull: { food: { _id: foodItemId } } }
  );
  if (!dateExists) {
    throw new errors.ProjectErrors("No data for selected day and user");
  }
};

const addFoodItem = async (body, userId) => {
  const currentDate = getCurrentDate();
  const dateExists = await Meal.findOne({ onDay: currentDate, userId: userId });
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
      onDay: currentDate,
      userId: userId,
      food: newFoodItem,
    };
    const meal = new Meal(newMealItem);
    await meal.save();
    return;
  }
  await Meal.updateOne(
    { onDay: currentDate, userId },
    { $push: { food: newFoodItem } }
  );
};

module.exports = {
  getFoodItems,
  getProducts,
  removeFoodItem,
  addFoodItem,
  getAllProducts,
};
