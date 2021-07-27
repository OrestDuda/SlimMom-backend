const calc = require("../services/calculatorServices");

const publicCalcController = async (req, res, next) => {
  const calculated = await calc.publicCalc(req.body);
  return res.status(200).json({ target: calculated });
};

const userCalcController = async (req, res, next) => {
  const currentUser = await calc.userCalc(req.body, req.user);
  return res.status(200).json({ currentUser });
};

module.exports = {
  publicCalcController,
  userCalcController,
};
