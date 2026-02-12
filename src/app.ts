import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { entryRouter } from "./routes/entryRoutes";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";

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
  app.use("/entry", entryRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  return app;
}
