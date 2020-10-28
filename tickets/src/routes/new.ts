import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@sltickets/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must > 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();
    // Better way is make these two actions in one transaction
    // Prevent first successed and second fail
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId, //pull data from mongose because it can have pre-save hooks that modify data
    });
    res.status(201).send(ticket);
  }
);
export { router as createTicketRouter };
