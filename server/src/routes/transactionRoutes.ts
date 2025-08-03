import { Router } from "express";
import { TransactionController } from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const transactionController = new TransactionController();

// Pobierz wszystkie transakcje dla konta
router.get(
  "/account/:accountId",
  authMiddleware,
  transactionController.getTransactions.bind(transactionController)
);

// Pobierz pojedynczą transakcję
router.get(
  "/:id",
  authMiddleware,
  transactionController.getTransaction.bind(transactionController)
);

// Utwórz transakcję dla konta
router.post(
  "/account/:accountId",
  authMiddleware,
  transactionController.createTransaction.bind(transactionController)
);

// Aktualizuj transakcję
router.put(
  "/:id",
  authMiddleware,
  transactionController.updateTransaction.bind(transactionController)
);

// Usuń transakcję
router.delete(
  "/:id",
  authMiddleware,
  transactionController.deleteTransaction.bind(transactionController)
);

export default router;
