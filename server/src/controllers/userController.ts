import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users" });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    try {
      const newUser = await this.userService.createUser(
        username,
        email,
        password
      );
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: "Error creating user" });
    }
  }
}
