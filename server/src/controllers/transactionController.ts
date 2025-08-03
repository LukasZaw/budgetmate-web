import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async getTransactions(req: Request, res: Response) {
    const userId = req.user.id;
    const accountId = Number(req.params.accountId);
    try {
      const transactions =
        await this.transactionService.getTransactionsByAccount(
          accountId,
          userId
        );
      res.json(transactions);
    } catch (error) {
      res.status(404).json({ message: "Account not found or no transactions" });
    }
  }

  async getTransaction(req: Request, res: Response) {
    const userId = req.user.id;
    const transactionId = Number(req.params.id);
    try {
      const transaction = await this.transactionService.getTransactionById(
        transactionId,
        userId
      );
      if (!transaction)
        return res.status(404).json({ message: "Transaction not found" });
      res.json(transaction);
    } catch (error) {
      res.status(404).json({ message: "Transaction not found" });
    }
  }

  async createTransaction(req: Request, res: Response) {
    const userId = req.user.id;
    const accountId = Number(req.params.accountId);
    const { amount, type, category, description, transactionAt } = req.body;
    try {
      const transaction = await this.transactionService.createTransaction(
        accountId,
        userId,
        {
          amount,
          type,
          category,
          description,
          transactionAt: transactionAt ? new Date(transactionAt) : new Date(),
        }
      );
      res.status(201).json(transaction);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ message });
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const userId = req.user.id;
    const transactionId = Number(req.params.id);
    const { amount, type, category, description, transactionAt } = req.body;
    try {
      const transaction = await this.transactionService.updateTransaction(
        transactionId,
        userId,
        {
          amount,
          type,
          category,
          description,
          transactionAt: new Date(transactionAt),
        }
      );
      res.json(transaction);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ message });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const userId = req.user.id;
    const transactionId = Number(req.params.id);
    try {
      await this.transactionService.deleteTransaction(transactionId, userId);
      res.json({ message: "Transaction deleted" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ message });
    }
  }
}
