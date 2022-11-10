require("dotenv").config();

// Express utility
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

// Mongoose connectivity
const mongoose = require("mongoose");

// Controllers imported before mongoose connection
const ticketRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const transactionRouter = require("./controllers/transactions");
const loginRouter = require("./controllers/login");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB.");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error.message);
  });

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

// Routes
app.use("/api/tickets", ticketRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
