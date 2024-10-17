import express from "express";
import { api } from "./src/routes/api.js";
import { PORT } from "./config.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "src/public")));
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
