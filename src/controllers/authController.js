const auth = require("../services/authServices");

const registrationController = async (req, res, next) => {
  const createdUser = await auth.registration(req.body);
  return res.status(201).json({ user: createdUser });
};

const loginController = async (req, res, next) => {
  const loggedUser = await auth.login(req.body);
  return res.status(200).json({ user: loggedUser });
};

const logoutController = async (req, res, next) => {
  await auth.logout(req.user._id);
  return res.status(204).json({});
};

const currentController = async (req, res, next) => {
  const currentUser = await auth.current(req.user._id);
  return res.status(200).json({ user: currentUser });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
};
