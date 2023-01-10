// const transactionRouter = require("express").Router();
// const Transaction = require("../models/transaction");
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");

// function getTokenFrom(request) {
//   // Checks the request for the authorization key
//   const auth = request.get("authorization");
//   if (auth && auth.toLowerCase().startsWith("bearer")) {
//     return auth.substring(7);
//   }

//   return null;
// }

// transactionRouter.get('/', async (request, response, next) => {
//   const body = request.body;

// })

// transactionRouter.get("/", (request, response) => {
//   Transaction.find({}).then((transactions) => {
//     response.json(transactions);
//   });
// });

// transactionRouter.post("/", async (request, response, next) => {

//   const { userId, amount } = request.body;

//   const user = await User.findById(userId);

//   const transaction = new Transaction({
//     amount: amount,
//     date: new Date(),
//     user: user._id,
//   });

//   const savedTransaction = await transaction.save();

//   user.transactions = user.transactions.concat(savedTransaction._id);
//   await user.save();

//   response.json(savedTransaction);
// });

// transactionRouter.delete("/", async (request, response, next) => {
//   const { userId } = request.body;

//   const user = await User.findById(userId);
//   user.transactions = [];

//   await user.save();

//   response.json(user);
// });

// module.exports = transactionRouter;
