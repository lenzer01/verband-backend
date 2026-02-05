import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { auth_router } from "./routes/authRoutes";
import { user_router } from "./routes/userRoutes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  // Routes
  app.use("/auth", auth_router);
  app.use("/user", user_router);

  return app;
}
