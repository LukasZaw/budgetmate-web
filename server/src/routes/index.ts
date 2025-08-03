import { Router, Application } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const router = Router();

const setupRoutes = (app: Application) => {
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
};

export default setupRoutes;
