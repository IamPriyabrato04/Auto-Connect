// controllers/createRoomHandler.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { generateRoomCode } from "../utils/generateRoomCode.js";
import { config } from "dotenv";
import { generateWiFiFingerprint } from "../utils/generateFingerprint.js";
import { log } from "console";
config();

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: { userId: string }; // from auth middleware
}

const CreateRoomSchema = z.object({
    roomName: z.string().min(1, "Room name is required"),
    autoJoinEnabled: z.boolean().default(false),
    ssid: z.string().optional(),
    bssid: z.string().optional(),
});

export const createRoomHandler = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const hostId = req.user?.userId;

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


        let roomCode: string = "";
        let isUnique = false;

        while (!isUnique) {
            roomCode = generateRoomCode();
            const existing = await prisma.room.findUnique({ where: { roomCode } });
            if (!existing) isUnique = true;
        }

        const room = await prisma.room.create({
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
            // console.log("Generated fingerprint hash:", fingerprintHash);


            const fingerprint = await prisma.networkFingerprint.create({
                data: {
                    fingerprintHash,
                    roomId: room.id
                }
            });
        }

        res.status(201).json({ roomCode });
    } catch (error) {
        console.error("Room creation failed:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
