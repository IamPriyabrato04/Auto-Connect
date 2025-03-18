import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup as express.RequestHandler);
// router.post("/login", login);
// router.post("/logout", logout);
// router.post("/google-auth", googleAuth);


export default router;