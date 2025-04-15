// middlewares/authenticateUser.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { log } from "node:console";

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void | Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("No token provided");
        res.status(401);
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = decoded; // 🔥 Important
        console.log("Middleware triggered");
        console.log("Auth Header:", req.headers.authorization);
        console.log("Token:", token);
        next();
    } catch (error) {
        console.log("err: ", error);
        res.status(403).json({ message: "Invalid or expired token" });
        return;
    }
};


export default authenticateUser;