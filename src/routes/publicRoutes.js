const express = require("express");
const router = express.Router();

const calc = require("../controllers/calculatorController");
const { asyncWrapper } = require("../helpers/asyncWrapper");

router.patch("/", asyncWrapper(calc.publicCalcController));

module.exports = router;
