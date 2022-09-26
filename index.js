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

app.post("/api/tickets", (request, response, next) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(404);
  }

  const ticket = new Ticket({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  ticket
    .save()
    .then((savedTicket) => {
      response.json(savedTicket);
    })
    .catch((err) => {
      console.log("Error saving ticket", err);
      next(err);
    });
});

app.get("/api/tickets/:id", (request, response, next) => {
  console.log("in api/tickets/:id");
  const id = request.params.id;
  Ticket.findById(id)
    .then((ticket) => {
      if (ticket) {
        console.log("TIcket found");
        response.json(ticket);
      } else {
        console.log("Ticket not found");
        response.status(404).end();
      }
    })
    .catch((err) => {
      console.log("Could not find ticket", err);
      next(err);
      // response.status(500).send({ error: "Malformatted id" });
    });
});

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

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
