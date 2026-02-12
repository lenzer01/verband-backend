import { Router } from "express";
import { authLogin, authRegister } from "../controller/authController";

export const authRouter = Router();

// POST /auth/register - Neuen Benutzer registrieren
authRouter.post("/register", authRegister);

// POST /auth/login - Benutzer anmelden
authRouter.post("/login", authLogin);

