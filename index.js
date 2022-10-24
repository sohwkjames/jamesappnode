require("dotenv").config();

const { response } = require("express");
const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

const mongoose = require("mongoose");
mongoose.connect(config.MONGODB_URI);

const Ticket = require("./models/ticket");

const ticketRouter = require("./controllers/notes");

const app = express();

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use("/api/tickets", ticketRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get("/", (request, response) => {
  response.send("<h1>Hello world, this is with Github actions</h1>");
});

// app.get("/api/tickets", (request, response) => {
//   Ticket.find({}).then((tickets) => {
//     response.json(tickets);
//   });
// });

// app.post("/api/tickets", (request, response, next) => {
//   const body = request.body;
//   if (body.content === undefined) {
//     return response.status(404);
//   }

//   const ticket = new Ticket({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   ticket
//     .save()
//     .then((savedTicket) => {
//       response.json(savedTicket);
//     })
//     .catch((err) => {
//       console.log("Error saving ticket", err);
//       next(err);
//     });
// });

// app.get("/api/tickets/:id", (request, response, next) => {
//   console.log("in api/tickets/:id");
//   const id = request.params.id;
//   Ticket.findById(id)
//     .then((ticket) => {
//       if (ticket) {
//         console.log("TIcket found");
//         response.json(ticket);
//       } else {
//         console.log("Ticket not found");
//         response.status(404).end();
//       }
//     })
//     .catch((err) => {
//       console.log("Could not find ticket", err);
//       next(err);
//       // response.status(500).send({ error: "Malformatted id" });
//     });
// });

// app.delete("/api/notes/:id", (req, res) => {
//   const id = request.params.id;
//   Ticket.findByIdAndRemove(id)
//     .then((result) => {
//       response.status(204).end();
//     })
//     .catch((err) => next(err));
// });

// app.put("/api/notes:id", (req, res) => {
//   const newTicket = {
//     content: body.content,
//     important: body.important,
//   };

//   const id = request.params.id;
//   Ticket.findByIdAndUpdate(id, newTicket, {
//     new: true,
//     runValidators: true,
//   });
// });

// Catch non routes
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };

// Error handler
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === "CastError") {
//     return response.status(400).send({ error: "malformatted id" });
//   } else if (error.name === "ValidationError") {
//     return repsonse.status(400).json({ error: error.message });
//   }

//   next(error);
// };

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
