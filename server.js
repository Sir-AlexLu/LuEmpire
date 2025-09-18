import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// serve static files (css, js, etc.) from app folder
app.use("/app", express.static(path.join(__dirname, "app")));

// serve index.html
app.get("/real-index", (req, res) => {
  res.sendFile(path.join(__dirname, "app/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Lu Empire backend running on port ${PORT}`);
});
