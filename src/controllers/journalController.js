const journal = require("../services/journalServices");

const getFoodItemsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const getDay = await journal.getFoodItems(req.params.forDay, userId);
  res.status(200).json({ dayJournal: getDay });
};

const getProductsController = async (req, res, next) => {
  const query = req.query.search;
  const results = await journal.getProducts(query);
  return res.status(200).json({ results });
};

const getAllProductsController = async (req, res, next) => {
  const fullCatalogue = await journal.getAllProducts();
  return res.status(200).json({ fullCatalogue });
};

const removeFoodItemController = async (req, res, next) => {
  const { _id: userId } = req.user;
  await journal.removeFoodItem(req.params, userId);
  return res.status(204).json({});
};

const addFoodItemController = async (req, res, next) => {
  const { _id: userId } = req.user;
  await journal.addFoodItem(req.body, userId);
  return res.status(201).json({});
};

module.exports = {
  getFoodItemsController,
  getProductsController,
  removeFoodItemController,
  addFoodItemController,
  getAllProductsController,
};
