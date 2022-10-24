const ticketRouter = require("express").Router();
const Ticket = require("../models/ticket");

ticketRouter.get("/", (request, response) => {
  Ticket.find({}).then((tickets) => {
    response.json(tickets);
  });
});

ticketRouter.post("/", (request, response, next) => {
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

ticketRouter.get("/:id", (request, response, next) => {
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

ticketRouter.delete("/:id", (req, res) => {
  const id = request.params.id;
  Ticket.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

ticketRouter.put("/:id", (req, res) => {
  const newTicket = {
    content: body.content,
    important: body.important,
  };

  const id = request.params.id;
  Ticket.findByIdAndUpdate(id, newTicket, {
    new: true,
    runValidators: true,
  });
});

module.exports = ticketRouter;
