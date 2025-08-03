import { Request, Response } from "express";
import { AccountService } from "../services/accountService";

export class AccountController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  async getAccounts(req: Request, res: Response) {
    const userId = req.user.id;
    const accounts = await this.accountService.getAccountsByUser(userId);
    res.json(accounts);
  }

  async getAccount(req: Request, res: Response) {
    const userId = req.user.id;
    const accountId = Number(req.params.id);
    const account = await this.accountService.getAccountById(accountId, userId);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.json(account);
  }

  async createAccount(req: Request, res: Response) {
    const userId = req.user.id;
    const { name } = req.body;
    const account = await this.accountService.createAccount(userId, name);
    res.status(201).json(account);
  }

  async updateAccount(req: Request, res: Response) {
    const userId = req.user.id;
    const accountId = Number(req.params.id);
    const { name, balance } = req.body;
    const updated = await this.accountService.updateAccount(accountId, userId, {
      name,
      balance,
    });
    if (updated.count === 0)
      return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account updated" });
  }

  async deleteAccount(req: Request, res: Response) {
    const userId = req.user.id;
    const accountId = Number(req.params.id);
    const deleted = await this.accountService.deleteAccount(accountId, userId);
    if (deleted.count === 0)
      return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account deleted" });
  }
}
