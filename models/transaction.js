const mongoose = require("mongoose");

const mongooseUrl = process.env.MONGODB_URI;

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

transactionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
