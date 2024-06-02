import * as express from "express";
import * as morgan from "morgan";
import { Request, Response } from "express";
import { serviceRouter } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use("/v1", serviceRouter);

app.use((req: Request, res: Response) => {
  return res.status(505).json({ message: "Bad Request" });
});

app.use(errorHandler);

export { app };
