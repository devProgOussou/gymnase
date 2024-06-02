import { Request, Response } from 'express';
import { AuthController } from '../../src/controllers/authController';
import { AuthService } from '../../src/services/authService';

jest.mock('../authService');

jest.mock('../authService');

describe('AuthController', () => {
  describe('login', () => {
    it('should return a token if authentication is successful', async () => {
      const mockRequest = { body: { username: 'test', password: 'password123' } } as Request;
      const mockResponse = { json: jest.fn() } as unknown as Response;

      (AuthService.authenticate as jest.Mock).mockResolvedValueOnce('mockedToken');

      await AuthController.login(mockRequest, mockResponse as any);

      expect(mockResponse.json).toHaveBeenCalledWith({ token: 'mockedToken' });
    });

    it('should return an error message if authentication fails', async () => {
      const mockRequest = { body: { username: 'test', password: 'wrongPassword' } };
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (AuthService.authenticate as jest.Mock).mockResolvedValueOnce(null);

      await AuthController.login(mockRequest, mockResponse as any);

      expect(mockResponse.status).toHaveBeenCalledWith(401);

      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid username or password' });
    });

    it('should return an error message if an internal server error occurs', async () => {
      const mockRequest = { body: { username: 'test', password: 'password123' } };
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (AuthService.authenticate as jest.Mock).mockRejectedValueOnce(new Error('Mocked error'));

      await AuthController.login(mockRequest, mockResponse as any);

      expect(mockResponse.status).toHaveBeenCalledWith(500);

      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });

  describe('register', () => {
    it('should return a token if registration is successful', async () => {
      const mockRequest = { body: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123' } };
      const mockResponse = { json: jest.fn() };

      (AuthService.register as jest.Mock).mockResolvedValueOnce('mockedToken');

      await AuthController.register(mockRequest, mockResponse as any);

      expect(mockResponse.json).toHaveBeenCalledWith({ token: 'mockedToken' });
    });

    it('should return an error message if registration fails', async () => {
      const mockRequest = { body: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123' } };
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (AuthService.register as jest.Mock).mockRejectedValueOnce(new Error('Mocked error'));

      await AuthController.register(mockRequest, mockResponse as any);

      expect(mockResponse.status).toHaveBeenCalledWith(500);

      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
});
