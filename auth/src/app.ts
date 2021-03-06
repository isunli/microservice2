import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import coockieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@sltickets/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  coockieSession({
    signed: false, //not encrypt the jwt
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
