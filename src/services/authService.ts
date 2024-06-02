import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthService {
  static async authenticate(email: string, password: string): Promise<string | null> {
    const user = await User.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return token;
    } else {
      return null;
    }
  }

  static async register(firstName: string, lastName: string, email: string, password: string) {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password
      }).save();
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return token
    } catch (error) {
      throw new Error("Erreur lors de la création du compte");
    }
  }

  static verifyToken(token: string): string | object {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not found in environment variables");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
