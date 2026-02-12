import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";
import { AppDataSource } from "./db/dataSource";
import { user_router } from "./routes/userRoutes";
import {auth_router} from "./routes/authRoutes";

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

  app.use("/auth", auth_router);
  app.use("/user", user_router);

  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("❌ Fatal startup error:", err);
  process.exit(1);
});
