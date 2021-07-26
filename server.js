const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const process = require("process");
const { connectMongo } = require("./src/db/connectionDB");
const publicRouter = require("./src/routes/publicRoutes");
const authRouter = require("./src/routes/authRoutes");
const catalogueRouter = require("./src/routes/catalogueRoutes");
const journalRouter = require("./src/routes/journalRoutes");
const calculatorRouter = require("./src/routes/calculatorRoutes");
const { errorHandler } = require("./src/helpers/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/public", publicRouter);
app.use("/api/users", authRouter);
app.use("/api/catalogue", catalogueRouter);
app.use("/api/journal", journalRouter);
app.use("/api/calculator", calculatorRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");
    app.listen(PORT, (err) => {
      if (err) console.error("Error at server launch:", err);
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
    process.exit(1);
  }
};

start();
