import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { z } from "zod";

config();

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


const signupSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
});


// sign up API
const signup = async (req: Request, res: Response) => {
    try {
        const validatedPassword = signupSchema.parse(req.body);
        const { name, email, password } = validatedPassword;

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

export { signup };