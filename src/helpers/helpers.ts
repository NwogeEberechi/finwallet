import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { jwtSecret } from "../config";

export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: any) {
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, jwtSecret);
  }
}
