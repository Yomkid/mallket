import { Request, Response } from 'express';
import authService from '../../services/auth.service';
import prisma from '../../config/prisma';

// 🔐 **User Registration**
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, roleName } = req.body;

    // Hash password
    const hashedPassword = await authService.hashPassword(password);

    // Find role, default to "CUSTOMER" if none provided
    const role = await prisma.role.findUnique({
      where: { name: roleName || "CUSTOMER" },
    });

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId: role?.id, // Assign role dynamically
      },
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔑 **User Login with Role Validation**
export const login = async (req: Request, res: Response) => {
  try {
    console.log('Login route hit');
    console.log('Request body:', req.body);

    const { email, password } = req.body;
    
    // Fetch user along with their role & permissions
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: { include: { permissions: true } } },
    });

    if (!user || !authService.comparePassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: "Access denied: User is banned" });
    }

    // Generate JWT
    const token = authService.generateToken(user.id);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  await prisma.blacklistedToken.create({ data: { token } });

  res.status(200).json({ message: "Logged out successfully!" });
};
