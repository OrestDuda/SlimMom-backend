const express = require("express");
const router = express.Router();

const catalogue = require("../controllers/catalogueController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/asyncWrapper");

router.use(authMiddleware);

router.get("/", asyncWrapper(catalogue.searchCatalogueController));
router.get("/all", asyncWrapper(catalogue.getAllCatalogueController));

module.exports = router;
