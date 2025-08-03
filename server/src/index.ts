import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import setupRoutes from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

setupRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
