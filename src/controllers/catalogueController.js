const catalogue = require("../services/catalogueServices");

const searchCatalogueController = async (req, res, next) => {
  const query = req.query.search;
  const results = await catalogue.searchCatalogue(query);
  return res.status(200).json({ results });
};

const getAllCatalogueController = async (req, res, next) => {
  const fullCatalogue = await catalogue.allCatalogue();
  return res.status(200).json({ fullCatalogue });
};

module.exports = {
  searchCatalogueController,
  getAllCatalogueController,
};
