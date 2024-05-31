import * as express from "express";
import * as morgan from "morgan";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { serviceRouter } from "./routes";
import { errorHandler } from "./middleware/errorHandler"
import { port } from "./config";

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use("/v1", serviceRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    // start express server
    app.use(errorHandler);
    app.listen(port);

    console.log(`Express server has started on ${port}`);
  })
  .catch((error) => console.log(error));
