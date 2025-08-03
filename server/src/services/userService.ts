import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(
    id: number,
    data: Partial<{ username: string; email: string; password: string }>
  ) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserService();
