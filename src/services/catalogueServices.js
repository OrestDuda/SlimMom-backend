const { Product } = require("../models/productsModel");
const errors = require("../helpers/errors");

const searchCatalogue = async (query) => {
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
const allCatalogue = async () => {
  const fullCatalogue = await Product.find({});
  return fullCatalogue;
};

module.exports = {
  searchCatalogue,
  allCatalogue,
};
