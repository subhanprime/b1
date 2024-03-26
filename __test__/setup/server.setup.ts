import express, { Application } from "express";
import app from "../../src/index";

const createMockServer = (): Application => {
  const server: Application = express();
  server.use(app);
  return server;
};

const mockServer = createMockServer();
export default mockServer;
