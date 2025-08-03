import { PrismaClient } from "@prisma/client";

export class AccountService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAccountsByUser(userId: number) {
    return await this.prisma.account.findMany({ where: { userId } });
  }

  async getAccountById(id: number, userId: number) {
    return await this.prisma.account.findFirst({ where: { id, userId } });
  }

  async createAccount(userId: number, name: string) {
    return await this.prisma.account.create({
      data: { name, userId },
    });
  }

  async updateAccount(
    id: number,
    userId: number,
    data: Partial<{ name: string; balance: number }>
  ) {
    return await this.prisma.account.updateMany({
      where: { id, userId },
      data,
    });
  }

  async deleteAccount(id: number, userId: number) {
    return await this.prisma.account.deleteMany({
      where: { id, userId },
    });
  }
}
