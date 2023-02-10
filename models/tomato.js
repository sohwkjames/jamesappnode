const mongoose = require("mongoose");

const mongooseUrl = process.env.MONGODB_URI;

const tomatoSchema = new mongoose.Schema({
  statType: {
    type: String,
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

tomatoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Tomato = mongoose.model("Tomato", tomatoSchema);
  
module.exports = Tomato;
