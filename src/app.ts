import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { entryRouter } from "./routes/entryRoutes";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";
import { productRouter } from "./routes/productRoutes";
import { firstAidKitRouter } from "./routes/firstAidKitRoutes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  // Swagger UI
  const swaggerDocument = YAML.load(path.join(__dirname, "..", "api-docs.yml"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  // Routes
  app.use("/entry", entryRouter);
  app.use("/firstAidKit", firstAidKitRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/product", productRouter);

  return app;
}
