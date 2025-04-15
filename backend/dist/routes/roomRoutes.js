import { Router } from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { createRoomHandler } from "../controllers/roomController.js";
const router = Router();
router.post("/create", authenticateUser, createRoomHandler);
export default router;
