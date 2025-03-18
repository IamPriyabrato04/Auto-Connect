import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
// router.post("/google-auth", googleAuth);
export default router;
