import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import coockieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { errorHandler, NotFoundError, currentUser } from "@sltickets/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  coockieSession({
    signed: false, //not encrypt the jwt
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(createTicketRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
