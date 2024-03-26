import morgan from "morgan";
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import config from "./config/config";
import route from "./routes/index";
import { connectDB } from "./db/db.connection";

const app: Application = express();

// express middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger implementation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// sample route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the pendulum admin application." });
});

// healthcheck route
app.get("/healthcheck", (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

// index router
const indexRouter: Router = route;
app.use(indexRouter);

// Starting server on PORT
if (config.port) {
  const PORT: string = config.port;
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
} else {
  console.log("Port is not specified!");
}

app.use((req: Request, res: Response, next: NextFunction) => {
  // allow access from every, eliminate CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  // set the allowed HTTP methods to be requested
  res.setHeader("Access-Control-Allow-Methods", "POST");
  // headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // allow request to continue and be handled by routes
  next();
});

connectDB();

export default app;
