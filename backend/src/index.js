import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

import sequelize from "./db.js";
import { loadModules, services } from "./modules-loader.js";

dotenv.config();

const app = express();
app.use(express.json());

const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: FRONTEND_ORIGIN }));

app.get("/health", (req, res) => res.json({ status: "ok" }));

const server = http.createServer(app);

const PORT = process.env.BACKEND_PORT || 4000;

(async () => {
  try {
    // IMPORTANT: Load modules (models/services/controllers) BEFORE calling sequelize.sync()
    // so that models get registered in the modules container and can be synced if needed.
    await loadModules(app);

    // Connect DB
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync database - this will create tables for models defined using Sequelize.
    // If you prefer migrations, replace sync() with migrations.
    await sequelize.sync();
    console.log("✅ Sequelize synced");

    // Start socket server after modules loaded so modules can access the services container
    const io = new Server(server, {
      cors: { origin: FRONTEND_ORIGIN },
    });

    io.on("connection", (socket) => {
      console.log("🔌🔌Socket connected🔌🔌", socket.id);
      socket.on("disconnect", () => {
        console.log("🔌🔌Socket disconnected🔌🔌", socket.id);
      });
    });

    // expose io to modules via services container (controllers/services can use services.io)
    services.io = io;

    server.listen(PORT, "0.0.0.0", () =>
      console.log(`🟢 Backend listening on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start backend", err);
    process.exit(1);
  }
})();
