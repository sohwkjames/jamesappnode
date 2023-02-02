const tomatoRouter = require("express").Router();
const Tomato = require("../models/tomato");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function getTokenFrom(request) {
  // Checks the request for the authorization key
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    return auth.substring(7);
  }

  return null;
}

tomatoRouter.get("/", (request, response) => {
  Tomato.find({}).then((tomatoes) => {
    response.json(tomatoes);
  });
});

tomatoRouter.post("/", async (request, response, next) => {
  // Expects jwt in request header: { authorization: bearer abc123 }
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  console.log("Found user from id:", user);

  // Save the toamto here
  const tomato = new Tomato({
    statType: request.body?.statType,
    date: new Date(),
    user: user._id,
  });

  await tomato.save();
  // response.json(tomato);

  response.status(200).json({ tomato: tomato });
});

module.exports = tomatoRouter;
