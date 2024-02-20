import dotenv from "dotenv";
import app from "./app";

dotenv.config();

(() => {
  const { PORT } = process.env;

  if (!PORT) {
    return console.log("\nDefine ENVs\n");
  }

  app.listen(PORT, () => console.log(`HMS server listening on port: ${PORT}`));
})();
