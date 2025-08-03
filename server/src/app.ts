import express from "express";
import cors from "cors";
import { json } from "body-parser";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/users", userRoutes);

export default app;