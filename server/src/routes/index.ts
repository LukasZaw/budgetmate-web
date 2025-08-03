import { Router, Application } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import accountRoutes from "./accountRoutes";

const router = Router();

const setupRoutes = (app: Application) => {
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/accounts", accountRoutes);
};

export default setupRoutes;
