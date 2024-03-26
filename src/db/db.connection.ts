import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import config from "../config/config";
import logger from "../utils/winstonLogging";

let mongod: MongoMemoryServer;

const connectDB = async () => {
  try {
    if (config.endpoint) {
      let dbUrl = config.endpoint;
      // If NODE_EVN is set to test mode in .env file
      // then run initate a mock database for unit testing
      mongoose.set("strictQuery", true);
      if (config.node_env === "test") {
        mongod = await MongoMemoryServer.create();
        dbUrl = mongod.getUri();
        console.log("Connected In test Mode URI : ", dbUrl);
        logger.info(`Database connected in Test mode with URI : ${dbUrl}`);
      }
      mongoose
        .connect(dbUrl)
        .then(() => console.log("Database Connected!"))
        .catch((err: Error) => console.log(err));
    }
  } catch (err) {
    console.log(err);
    logger.error(`Database Error : ${err}`);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { disconnectDB, connectDB };
