import dotenv from "dotenv";
dotenv.config();
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";



const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Simpan io supaya bisa dipakai di API route
  global.io = io;

  io.on("connection", (socket) => {
    // console.log("User connected:", socket.id);

    socket.on("join-layanan", (layananId) => {
      socket.join(`layanan-${layananId}`);
    });

    socket.on("disconnect", () => {
      // console.log("User disconnected:", socket.id);
    });
  });

  httpServer.listen(3000, () => {
    // console.log("Ready on ",process.env.NEXT_PUBLIC_LOCAL_URL || "http://localhost:3000");
  });
});