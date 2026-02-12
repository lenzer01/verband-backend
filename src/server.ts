import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import { AppDataSource } from "./db/dataSource";
import { userRouter } from "./routes/userRoutes";
import {authRouter} from "./routes/authRoutes";

async function main() {
  const app = createApp();

  console.log("DB CONFIG", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  passLen: process.env.DB_PASS?.length,
  db: process.env.DB_NAME,
});

  // DB verbinden
  await AppDataSource.initialize();
  console.log("✅ Database connected");

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("❌ Fatal startup error:", err);
  process.exit(1);
});
