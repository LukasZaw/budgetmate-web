import { Router } from "express";
import { AccountController } from "../controllers/accountController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const accountController = new AccountController();

router.get(
  "/",
  authMiddleware,
  accountController.getAccounts.bind(accountController)
);
router.get(
  "/:id",
  authMiddleware,
  accountController.getAccount.bind(accountController)
);
router.post(
  "/",
  authMiddleware,
  accountController.createAccount.bind(accountController)
);
router.put(
  "/:id",
  authMiddleware,
  accountController.updateAccount.bind(accountController)
);
router.delete(
  "/:id",
  authMiddleware,
  accountController.deleteAccount.bind(accountController)
);

export default router;
