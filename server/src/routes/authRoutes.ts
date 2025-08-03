import { Router } from "express";
import { login } from "../controllers/authController";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController";

const router = Router();
router.post("/login", login);

router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
