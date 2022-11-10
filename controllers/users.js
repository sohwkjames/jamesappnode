// hashing passwords
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");


usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("transactions");

  response.json(users);
});

// sign up
usersRouter.post("/", async (request, response) => {
  // Get username, name, password from request.body

  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "Username is already in use.",
    });
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: "Username must be at least 3 characters long.",
    });
  }

  const saltRounds = 5;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  console.log("user->", user);

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
