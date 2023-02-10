// hashing passwords
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/current", async (request, response) => {
  console.log("request", request);
});

// New user sign up
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

  const savedUser = await user.save();

  console.log("savedUser", savedUser);

  // Create obj with username and user.id
  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  // Sign the obj with secret key, get token
  const token = jwt.sign(userForToken, process.env.JWT_SECRET);

  // Send the token back in the shape of { token, username, name }

  response.status(201).send({
    token,
    username: savedUser.username,
    name: savedUser.username,
  });
});

module.exports = usersRouter;
