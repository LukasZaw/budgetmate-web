import { PrismaClient } from "@prisma/client";

export type TransactionType = "income" | "expense";

export class TransactionService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getTransactionsByAccount(accountId: number, userId: number) {
    return await this.prisma.transaction.findMany({
      where: {
        accountId,
        account: { userId },
      },
      orderBy: { transactionAt: "desc" },
    });
  }

  async getTransactionById(id: number, userId: number) {
    return await this.prisma.transaction.findFirst({
      where: {
        id,
        account: { userId },
      },
    });
  }

  async createTransaction(
    accountId: number,
    userId: number,
    data: {
      amount: number;
      type: TransactionType;
      category: string;
      description?: string;
      transactionAt: Date;
    }
  ) {
    // Sprawdź czy konto należy do użytkownika
    const account = await this.prisma.account.findFirst({
      where: { id: accountId, userId },
    });
    if (!account) throw new Error("Account not found");

    return await this.prisma.transaction.create({
      data: {
        accountId,
        ...data,
      },
    });
  }

  async updateTransaction(
    id: number,
    userId: number,
    data: Partial<{
      amount: number;
      type: TransactionType;
      category: string;
      description?: string;
      transactionAt?: Date;
    }>
  ) {
    // Sprawdź czy transakcja należy do użytkownika
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, account: { userId } },
    });
    if (!transaction) throw new Error("Transaction not found");

    return await this.prisma.transaction.update({
      where: { id },
      data,
    });
  }

  async deleteTransaction(id: number, userId: number) {
    // Sprawdź czy transakcja należy do użytkownika
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, account: { userId } },
    });
    if (!transaction) throw new Error("Transaction not found");

    return await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
