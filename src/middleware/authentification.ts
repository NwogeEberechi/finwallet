import { NextFunction, Request, Response } from "express";
import { tokenHeaderKey } from "../config";
import { encrypt } from "../helpers/helpers";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const authentification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers[tokenHeaderKey];
    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decode = encrypt.verifyToken(token);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRepository = AppDataSource.getRepository(User);
    req[" currentUser"] = decode;
    const user = await userRepository.findOne({
      where: { id: req[" currentUser"].id },
    });
    if (!user) {
      return res.status(401).json({ message: "User does not exist or token has expired." });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
