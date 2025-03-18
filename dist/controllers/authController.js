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
import { config } from "dotenv";
import { z } from "zod";
config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const signupSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
});
// sign up API
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedPassword = signupSchema.parse(req.body);
        const { name, email, password } = validatedPassword;
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
export { signup };
