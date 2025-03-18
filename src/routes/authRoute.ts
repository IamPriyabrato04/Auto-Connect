import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup as express.RequestHandler);
router.post("/login", login as express.RequestHandler);
router.get("/logout", logout as express.RequestHandler);
// router.post("/google-auth", googleAuth);


export default router;