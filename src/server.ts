import Hapi from "@hapi/hapi";
import mongoose from "mongoose";
import { defineRoutes } from "./routes";

// this is the hapi server used in the tests
const getServer = () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
  });

  defineRoutes(server);

  return server;
};
// initialize the server with the mongoose connection
export const initializeServer = async () => {
  const uri: string =
    process.env.MONGO_DB_URI || "mongodb://localhost:27017/item_db";
  await mongoose.connect(uri);
  const server = getServer();
  await server.initialize();
  return server;
};

export const startServer = async () => {
  const server = getServer();
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
};
