var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { z } from "zod";
config();
import { PrismaClient } from '@prisma/client';
const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();
const signupSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
});
// sign up API
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = signupSchema.parse(req.body);
        const { name, email, password } = validatedData;
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield prisma.user.create({
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
});
// Login API
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const User = yield prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (!User) {
            return res.status(401).json({
                message: "Email not registered",
            });
        }
        if (!(yield bcrypt.compare(password, User.password))) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign({ userId: User.id }, JWT_SECRET, { expiresIn: "24h" });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
        return res.json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};
export { signup, login, logout };
