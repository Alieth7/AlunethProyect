import express from "express";
import { api } from "./src/routes/api.js";
import { PORT } from "./config.js";

const app = express();

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
