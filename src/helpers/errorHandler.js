const { ProjectErrors } = require("./errors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof ProjectErrors) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message, error });
};

module.exports = {
  errorHandler,
};
