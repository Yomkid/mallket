import { Request, Response } from 'express';
import authService from '../services/auth.service';

export const register = (req: Request, res: Response) => authService.register(req, res);

export const login = (req: Request, res: Response) => {
  console.log('Login route hit');
  console.log('Request body:', req.body); // 👀 Log the body here
  authService.login(req, res);
};

// export const logout = (req: Request, res: Response) => {
//   console.log('Logout route hit');
//   authService.logout(req, res);
// };
