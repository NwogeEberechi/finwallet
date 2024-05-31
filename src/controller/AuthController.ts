import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/helpers";

dotenv.config();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = encrypt.comparePassword(user?.password, password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "Invalid password." });
      }

      const token = encrypt.generateToken({ id: user.id });
      return res.status(200).json({
        message: "Login successful",
        user: { ...user, password: undefined },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}
