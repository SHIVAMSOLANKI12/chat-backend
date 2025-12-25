import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));

// test route
app.get("/", (req, res) => {
  res.send("Backend is LIVE 🚀");
});

// routes
app.use("/api/v1/user", userRoute);

// socket
initSocket(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
