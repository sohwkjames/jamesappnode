require("dotenv").config();

const { response } = require("express");
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const Ticket = require("./models/ticket");

const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(cors());

app.use(requestLogger);

mongoose.connect(process.env.MONGODB_URI);

app.get("/", (request, response) => {
  response.send("<h1>Hello world, this is with Github actions</h1>");
});

app.get("/api/tickets", (request, response) => {
  Ticket.find({}).then((tickets) => {
    response.json(tickets);
  });
});

// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find((note) => {
//     return note.id === id;
//   });
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

// app.post("/api/notes", (request, response) => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   const note = request.body;
//   console.log(note);
//   response.json(note);
// });

// app.delete("/api/notes/:id", (req, res) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((item) => item.id !== id);
//   response.status(204).end();
// });

// Catch non routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
