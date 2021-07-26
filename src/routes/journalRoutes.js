const express = require("express");
const router = express.Router();

const journal = require("../controllers/journalController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  addItemValidation,
} = require("../middlewares/journalValidationMiddleware");

router.use(authMiddleware);

router.get("/:forDay", asyncWrapper(journal.getFoodItemsController));
router.post(
  "/",
  addItemValidation,
  asyncWrapper(journal.addFoodItemController)
);
router.delete(
  "/:forDay?/:foodItemId",
  asyncWrapper(journal.removeFoodItemController)
);

module.exports = router;
