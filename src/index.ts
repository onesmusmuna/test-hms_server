import dotenv from "dotenv";
import app from "./app";

dotenv.config();

(() => {
  app.listen(process.env.PORT, () =>
    console.log(`HMS server listening on port: ${process.env.PORT}`)
  );
})();
