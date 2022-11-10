const transactionRouter = require("express").Router();
const Transaction = require("../models/transaction");
const User = require("../models/user");

// Defines routes, and the controller methods.

transactionRouter.get("/", (request, response) => {
  Transaction.find({}).then((transactions) => {
    response.json(transactions);
  });
});

transactionRouter.post("/", async (request, response, next) => {
  const { userId, amount } = request.body;

  const user = await User.findById(userId);

  const transaction = new Transaction({
    amount: amount,
    date: new Date(),
    user: user._id,
  });

  const savedTransaction = await transaction.save();

  user.transactions = user.transactions.concat(savedTransaction._id);
  await user.save();

  response.json(savedTransaction);
});

transactionRouter.delete("/", async (request, response, next) => {
  const { userId } = request.body;

  const user = await User.findById(userId);
  user.transactions = [];

  await user.save();

  response.json(user);
});

module.exports = transactionRouter;
