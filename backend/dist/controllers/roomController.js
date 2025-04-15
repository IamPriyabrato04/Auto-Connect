var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { generateRoomCode } from "../utils/generateRoomCode.js";
import { config } from "dotenv";
import { generateWiFiFingerprint } from "../utils/generateFingerprint.js";
config();
const prisma = new PrismaClient();
const CreateRoomSchema = z.object({
    roomName: z.string().min(1, "Room name is required"),
    autoJoinEnabled: z.boolean().default(false),
    ssid: z.string().optional(),
    bssid: z.string().optional(),
});
export const createRoomHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("Inside createRoom controller");
        console.log("req.user:", req.user);
        console.log("req.body:", req.body);
        if (!hostId) {
            console.log("Host ID not found in request");
            res.status(401).json({ message: "Host ID required" });
            return;
        }
        const parsed = CreateRoomSchema.safeParse(req.body);
        if (!parsed.success) {
            console.log("Validation failed:", parsed.error);
            res.status(400).json({
                message: "Invalid input",
                errors: parsed.error.flatten(),
            });
            return;
        }
        const { roomName, autoJoinEnabled, ssid, bssid } = parsed.data;
        console.log("Creating room with data:", { roomName: roomName, autoJoinEnabled: autoJoinEnabled, hostId: hostId });
        let roomCode = "";
        let isUnique = false;
        while (!isUnique) {
            roomCode = generateRoomCode();
            const existing = yield prisma.room.findUnique({ where: { roomCode } });
            if (!existing)
                isUnique = true;
        }
        const room = yield prisma.room.create({
            data: {
                name: roomName,
                hostId,
                roomCode,
                autoJoinEnabled,
            },
        });
        // Only store fingerprint if auto-join is enabled and ssid/bssid are present
        if (autoJoinEnabled && ssid && bssid) {
            const fingerprintHash = generateWiFiFingerprint(ssid, bssid);
            console.log("Generated fingerprint hash:", fingerprintHash);
            const fingerprint = yield prisma.networkFingerprint.create({
                data: {
                    fingerprintHash,
                    roomId: room.id
                }
            });
            console.log("Storing fingerprint for room successfully", room.id, fingerprint.id);
        }
        res.status(201).json({ roomCode });
    }
    catch (error) {
        console.error("Room creation failed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
