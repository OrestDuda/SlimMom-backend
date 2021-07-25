const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  userRegistrationValidation,
} = require("../middlewares/registrationValidationMiddleware");
const {
  userLoginValidation,
} = require("../middlewares/loginValidationMiddleware");
const { asyncWrapper } = require("../helpers/asyncWrapper");

router.post(
  "/registration",
  userRegistrationValidation,
  asyncWrapper(auth.registrationController)
);
router.post("/login", userLoginValidation, asyncWrapper(auth.loginController));
router.post("/logout", authMiddleware, asyncWrapper(auth.logoutController));
router.get("/current", authMiddleware, asyncWrapper(auth.currentController));

module.exports = router;
