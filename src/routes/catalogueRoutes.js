const express = require("express");
const router = express.Router();

const journal = require("../controllers/journalController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/asyncWrapper");

router.use(authMiddleware);

router.get("/", asyncWrapper(journal.getProductsController));
router.get("/all", asyncWrapper(journal.getAllProductsController));

module.exports = router;
