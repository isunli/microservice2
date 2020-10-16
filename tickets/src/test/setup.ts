import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";
declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "afeawfs";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = () => {
  // Build a JWT payload. {id, email}
  const payload = {
    id: " jodej",
    email: "test@test.com",
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session OBJ
  const session = { jwt: token };
  // TUrn session into json
  const sessionJSON = JSON.stringify(session);
  // take json and encode it as base64
  const b64 = Buffer.from(sessionJSON).toString("base64");
  // return a string
  return [`express:sess=${b64}`];
};
