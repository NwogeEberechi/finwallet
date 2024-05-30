import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const userAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: { id: req[" currentUser"].id },
  });

  if (user.id !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
