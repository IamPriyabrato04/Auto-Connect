import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { z } from "zod";

config();

import { PrismaClient } from '@prisma/client'
const JWT_SECRET = process.env.JWT_SECRET as string;
const prisma = new PrismaClient();


const signupSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
});


// sign up API
const signup = async (req: Request, res: Response) => {
    try {
        const validatedData = signupSchema.parse(req.body);
        const { name, email, password } = validatedData;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        res.status(400).json({ message: "Invalid input", error });
    }
};

// Login API
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const User = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (!User) {
            return res.status(401).json({
                message: "Email not registered",
            });
        }

        if (!(await bcrypt.compare(password, User.password))) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ userId: User.id }, JWT_SECRET, { expiresIn: "24h" });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

        return res.send({
            message: "Login successful",
            token,
            user: {
                id: User.id,
                name: User.name,
                email: User.email
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Logout API
const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

export { signup, login, logout };