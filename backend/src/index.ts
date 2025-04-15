import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import roomRoutes from "./routes/roomRoutes.js";

config();
const app = express();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use("/auth", authRoute);
app.use("/api/room", roomRoutes);


app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});