import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async login(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      const token = await AuthService.authenticate(username, password);
      if (token) {
        response.json({ token });
      } else {
        response.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }

  static async register(request: Request, response: Response) {
    const { firstName, lastName, email, password } = request.body
    try {
      const token = await AuthService.register(firstName, lastName, email, password)
      if (token) {
        response.json({ token });
      } else {
        response.status(401).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      response.status(500).json({ message: "Internal server error" });
    }
  }
}
