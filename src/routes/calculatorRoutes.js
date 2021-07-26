const express = require("express");
const router = express.Router();

const calc = require("../controllers/calculatorController");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.use(authMiddleware);
router.patch("/", asyncWrapper(calc.userCalcController));

module.exports = router;
