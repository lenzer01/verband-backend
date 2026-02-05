import { Router } from "express";
import { auth_login, auth_register } from "../controller/authController";

export const auth_router = Router();

// POST /auth/register - Neuen Benutzer registrieren
auth_router.post("/register", auth_register);

// POST /auth/login - Benutzer anmelden
auth_router.post("/login", auth_login);

