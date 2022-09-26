const mongoose = require("mongoose");

const mongooseUrl = process.env.MONGODB_URI;

console.log("Connecting");
mongoose
  .connect(mongooseUrl)
  .then((result) => {
    console.log("Connected to mongoose.");
  })
  .catch((err) => {
    console.log("Error connectong to mongoose", err);
  });

const ticketSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

ticketSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
