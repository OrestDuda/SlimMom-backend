const journal = require("../services/journalServices");

const getJournalController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const getDay = await journal.getJournal(req.params.forDay, userId);
  if (!getDay) {
    return res.status(204).json({});
  }
  res.status(200).json({ dayJournal: getDay });
};

const removeFoodItemController = async (req, res, next) => {
  const { _id: userId } = req.user;
  await journal.removeFoodItem(req.params, userId);
  return res.status(204).json({});
};

const addFoodItemController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const updatedDayJournal = await journal.addFoodItem(req.body, userId);
  return res.status(201).json({ dayJournal: updatedDayJournal });
};

module.exports = {
  getJournalController,
  removeFoodItemController,
  addFoodItemController,
};
