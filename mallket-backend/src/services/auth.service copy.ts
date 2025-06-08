import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'mallket_secret';

async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) return res.status(409).json({ message: 'Email already in use' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email } });
}

async function login(req: Request, res: Response) {
console.log("Request body:", req.body); // <-- debug this
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
}


export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

const generateToken = (userId: string | number) => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret';
  return jwt.sign({ userId }, secret, { expiresIn: '1d' });
};



export default { register, login, hashPassword, comparePassword, generateToken };
