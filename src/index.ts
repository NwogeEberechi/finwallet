import { AppDataSource } from "./data-source";
import { port, postgresDatabase } from "./config";
import { app } from "./app";

AppDataSource.initialize()
  .then(async () => {
    app.listen(port);

    console.log(`Express server has started on ${port}`);
  })
  .catch((error) => console.log(error));
