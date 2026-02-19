import { Router } from "express";
import { authLogin, authRegister } from "../controller/authController";
import { authenticate, adminOnly } from "../middleware/authMiddleware";

export const authRouter = Router();

// POST /auth/register - Neuen Benutzer registrieren (nur Admins)
authRouter.post("/register", authenticate, adminOnly, authRegister);

// POST /auth/login - Benutzer anmelden
authRouter.post("/login", authLogin);

